const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function handleRequest(req, res) {
    let safeUrl = req.url.split('?')[0];
    let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Halaman Tidak Ditemukan');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

function startServer(portToTry) {
    const s = http.createServer(handleRequest);
    s.listen(portToTry, () => {
        console.log('\n🌸 ========================================= 🌸');
        console.log(`✨ Server Photobox & Kuis Gombal Berjalan! ✨`);
        console.log(`👉 Buka di browser: http://localhost:${portToTry}`);
        console.log('🌸 ========================================= 🌸\n');
    });

    s.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${portToTry} sedang aktif, mencoba membuka di http://localhost:${portToTry + 1}...`);
            startServer(portToTry + 1);
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(PORT);

