const request = require('request');
const fs = require('fs');
const INPUT = 'http://localhost:8080/source.mp4';
const OUTPUT = 'output.mp4';

if (fs.existsSync(OUTPUT)) {
    fs.unlinkSync(OUTPUT);
}
const output = fs.createWriteStream(OUTPUT);
//request the file
const req = request.get(INPUT);
req.on('response', (response) => {
    req.pipe(output);
});