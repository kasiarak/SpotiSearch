import { createServer } from 'http';
import dotenv from 'dotenv';
import getSpotifyToken from './utils/spotify.js';

dotenv.config();
const PORT = process.env.PORT;

const jsonMiddleWare = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next(); 
}

const notFoundHandler = (res) => {
    res.write(JSON.stringify({message: 'Route not found'}));
    res.end();
}

const server = createServer((req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    jsonMiddleWare(req, res, async () => { 
        if (req.url === '/getArtistId' && req.method === 'POST') {
            try {
                const token = await getSpotifyToken();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ token }));
            } catch (error) {
                console.error('Error fetching Spotify token:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        } else {
            notFoundHandler(res);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
