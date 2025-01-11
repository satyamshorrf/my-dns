const dgram = require('dgram');
const dnsPacket = require('dns-packet');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    console.log({
        question: incomingReq.questions[0].name,
        rinfo
    });
});

server.bind(53, () => console.log('DNS Server running on port 53'));