
const mongoose = require('mongoose');
const io = require('socket.io');
const Document = require('./Document');

const db = mongoose.connect('mongodb://localhost:27017/google-docs-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch(error => {
    console.log(error);
});

const defaultValue = '';

async function findOrCreateDocument(id) {
    if (id == null) return;
    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
}

const ioApp = io(3001, { cors: { origin: 'http://localhost:3000', method: ['GET', 'POST'] } });

ioApp.on('connection', socket => {

    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { data });
        });

    });

});

