"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./pageArtist.module.css";
import SearchBar from "@/app/components/SearchBar";
import Song from "@/app/components/song";
import Album from "@/app/components/Album";

export default function ArtistPage() {
    const params = useParams(); 
    const artistId = params?.id; 
    const [artistData, setArtistData] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function fetchArtistDetails(artistId) {
        if (!artistId) return;

        const API_URL = process.env.NEXT_PUBLIC_API_URL + "/getArtistDetails";
        setLoading(true); 
        setError(false); 

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ artistId }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch artist details");
            }

            const data = await response.json();

            if (!data || Object.keys(data).length === 0) {
                setError(true); 
                setArtistData(null);
            } else {
                setArtistData(data);
            }
        } catch (error) {
            console.error("Error fetching artist details:", error);
            setError(true);
        } finally {
            setLoading(false); 
        }
    }

    async function fetchTopTracks(artistId) {
        if (!artistId) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL + "/getTopTracks";
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ artistId }),
            });

            if (!response.ok) throw new Error("Failed to fetch top tracks");
            const data = await response.json();
            setTopTracks(data || []);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    }

    async function fetchAlbums(artistId) {
        if (!artistId) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL + "/getArtistAlbums";
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ artistId }),
            });

            if (!response.ok) throw new Error("Failed to fetch albums");
            const data = await response.json();
            setAlbums(data || []);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    useEffect(() => {
        if (artistId) {
            fetchArtistDetails(artistId);
            fetchTopTracks(artistId);
            fetchAlbums(artistId);
        }
    }, [artistId]);

    return (
        <div className={styles.artistPage}>
            <div className={styles.searchBar}><SearchBar/></div>
            {loading && <h1 className={styles.alertText}>Loading...</h1>}  
            {!loading && error && <h1 className={styles.alertText}>Artist not found</h1>}  
            {!loading && artistData && (
                <div className={styles.BasicInformation}>                
                    <img src={artistData.image} alt={artistData.name}/>
                    <div>
                        <h1>{artistData.name}</h1>
                        {artistData.genres.length > 0 && (
                        <p>Genres: {artistData.genres.join(", ")}</p>)}    
                        <p>Followers: {artistData.followers}</p>
                    </div>
                </div>
            )}
            {!loading && topTracks.length > 0 && (
                <div className={styles.topTracks}>
                    <h2>Top Tracks</h2>
                    {topTracks.map((track, index) => (
                        <Song key={track.id} id={index+1} title={track.title} album={track.album} albumCover={track.albumCover} duration={track.duration_ms}/>
                    ))}
                </div>
            )}
            {!loading && albums.length > 0 && (
                <>
                    <h2>Albums</h2>
                    <div className={styles.albumsContainer}>
                        {albums.map(album => (
                            <Album key={album.id} cover={album.cover} title={album.title} release_date={album.release_date}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
