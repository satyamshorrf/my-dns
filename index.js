const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log({
        msg: msg.toString(),
        rinfo
    });
});

server.bind(53, () => console.log('DNS Server running on port 53'));