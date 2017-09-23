import socketIo from 'socket.io';

let io;
//
// Socket IO setup
// -----------------------------------------------------------------------------
export function startIo (server) {
    io = socketIo(server);

    io.on('connection', (socket) => {
        const room = `game-${socket.handshake.query.gameId}`;
        socket.join(room);
        socket.on('click:box', (msg) => {
            io.to(room).emit('click:box', msg);
        });
    });
}

export function sendMessage (roomId, event, msg) {
    io.to(roomId).emit(event, msg);
}

