const dgram = require('dgram');
const dnsPacket = require('dns-packet');

const server = dgram.createSocket('udp4');

const db = {
    'satyamshorrf.dev': {
        type: 'A',
        data: '127.0.0.1',
    },
    'www.satyamshorrf.dev': {
        type: 'CNAME',
        data: 'hashnode.network',
    },
}

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    const ipFromDb = db[incomingReq.questions[0].name];

    const ans = dnsPacket.encode({
        type: 'response',
        id: incomingReq.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        answers: [{
            type: 'ipFromDb.type',
            class: 'IN',
            name: incomingReq.questions[0].name,
            data: ipFromDb.data,
        }]
    });

    server.send(ans, rinfo.port, rinfo.address);
});

server.bind(53, () => console.log('DNS Server running on port 53'));