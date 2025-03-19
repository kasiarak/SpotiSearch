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
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const { artistName } = JSON.parse(body);
                    if (!artistName) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Artist name is required' }));
                        return;
                    }

                    const token = await getSpotifyToken();

                    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artistName)}&type=artist`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const searchData = await searchResponse.json();
                    const artist = searchData.artists?.items[0];

                    if (!artist) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Artist not found' }));
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ id: artist.id }));
                } catch (error) {
                    console.error('Error fetching artist ID:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            });
        }else if(req.url === '/getArtistDetails' && req.method === 'POST'){
            let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { artistId } = JSON.parse(body);
                if (!artistId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Artist ID is required' }));
                    return;
                }

                const token = await getSpotifyToken();

                const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!artistResponse.ok) {
                    res.writeHead(artistResponse.status, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Artist not found' }));
                    return;
                }

                const artistData = await artistResponse.json();

                const artistInfo = {
                    name: artistData.name,
                    image: artistData.images?.length > 0 ? artistData.images[0].url : null,
                    genres: artistData.genres,
                    followers: artistData.followers?.total || 0
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(artistInfo));
            } catch (error) {
                console.error('Error fetching artist details:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
        } else if (req.url === '/getTopTracks' && req.method === 'POST') {
            let body = '';
        
            req.on('data', chunk => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                try {
                    const { artistId } = JSON.parse(body);
                    if (!artistId) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Artist ID is required' }));
                        return;
                    }
        
                    const token = await getSpotifyToken();
        
                    const tracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` }
                    });
        
                    if (!tracksResponse.ok) {
                        res.writeHead(tracksResponse.status, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Failed to fetch top tracks' }));
                        return;
                    }
        
                    const tracksData = await tracksResponse.json();
                    const topTracks = tracksData.tracks.map(track => ({
                        id: track.id,
                        title: track.name,
                        album: track.album.name,
                        albumCover: track.album.images?.length > 0 ? track.album.images[0].url : null,
                        duration_ms: track.duration_ms,
                    }));
        
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(topTracks));
                } catch (error) {
                    console.error('Error fetching top tracks:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            });
        } else {
            notFoundHandler(res);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
