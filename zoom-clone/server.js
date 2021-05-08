

const https = require('https');
const fs = require('fs');

const { v4: uuidV4 } = require('uuid');
const express = require('express');
const app = express();


try {
    const options = {
        key: fs.readFileSync('./keys/private.pem'),
        cert: fs.readFileSync('./keys/public.pem')
    };
    const server = https.createServer(options, app);

    const io = require('socket.io')(server);

    io.on('connection', socket => {

        socket.on('join-room', (roomId, userId) => {
            console.log(roomId, userId);
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('user-connected', userId);
            socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected', userId);
            });
        });

    });
    
    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.redirect(`/${uuidV4()}`);
    });

    app.get('/:room', (req, res) => {
        res.render('room', { roomId: req.params.room });
    });

    server.listen(3000, () => {
        console.log('https server started on 3000');
    });

} catch (error) {
    console.error(error);
}

