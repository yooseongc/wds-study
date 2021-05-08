
const socket = io('/');
const myPeer = new Peer();

const videoGrid = document.getElementById('video-grid');
const peers = {};

const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    console.log('add my video', stream);
    addVideoStream(myVideo, stream);
    myPeer.on('call', call => {
        console.log('new call', stream);
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            console.log('connect to new call', userVideoStream);
            addVideoStream(video, userVideoStream);
        });
    });
    socket.on('user-connected', userId => {
        console.log('new user connected: ' + userId);
        connectToNewUser(userId, stream);
    });
    socket.on('user-disconnected', userId => {
        console.log('user disconnected: ' + userId);
        if (peers[userId]) peers[userId].close();
    });
});

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})


function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
    peers[userId] = call;
}
