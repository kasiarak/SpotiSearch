"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./pageArtist.module.css";
import SearchBar from "@/app/components/SearchBar";

export default function ArtistPage() {
    const params = useParams(); 
    const artistId = params?.id; 
    const [artistData, setArtistData] = useState(null);
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

    useEffect(() => {
        if (artistId) {
            fetchArtistDetails(artistId);
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
        </div>
    );
}
