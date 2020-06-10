const axios = require('axios');
const httpAdapter = require('axios/lib/adapters/http');
const fs = require('fs');
const INPUT = 'http://localhost:8080/source.mp4';
const OUTPUT = 'output.mp4';

if (fs.existsSync(OUTPUT)) {
    fs.unlinkSync(OUTPUT);
}
const output = fs.createWriteStream(OUTPUT);
//request the file
axios.get(INPUT, {responseType: 'stream', adapter: httpAdapter})
.then((response) => {
    const stream = response.data;
    stream.on('data', (chunk /* chunk is an ArrayBuffer */) => {
        output.write(new Buffer.from(chunk));
    });
    stream.on('end', () => {
        output.end();
    });
});