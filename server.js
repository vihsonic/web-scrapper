const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
});
// console.log(`Server is running on port ${port}`);