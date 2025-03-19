"use client";
import styles from "./SearchBar.module.css";
import { DM_Sans } from "next/font/google"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

const dm_sans = DM_Sans({ subsets: ['latin'], weight: ['500'] });

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [artistIsNotFound, setAristIsNotFound] = useState(false);
    const router = useRouter();

    async function fetchArtistId(artistName) {
        const API_URL = process.env.NEXT_PUBLIC_API_URL + "/getArtistId";
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ artistName }),
        });

        const data = await response.json();
        if (data.message === "Artist not found" || !data.id) {
            return null;
        }

        return data.id;
    }

    const searchArtist = async () => {
        try {
            const id = await fetchArtistId(query);
    
            if (!id) {
                setAristIsNotFound(true); 
            } else {
                if(artistIsNotFound) setAristIsNotFound(false); 
                if (query.trim()) {
                    router.push(`/Artist/${id}`);
                }
            }
        } catch (error) {
            console.error("Error fetching artist:", error);
        }
    };

    return (
        <div>
            <div className={styles.searchBar}>
            <button onClick={searchArtist}>
                <img src="magnifying-glass-svgrepo-com.svg" alt="Search"/>
            </button>
            <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className={dm_sans.className} 
                placeholder="Search for an artist..."
            />
        </div>
        {artistIsNotFound && <p className={styles.alert}>No results found for this artist. Please try a different name.</p>}
        </div>
    );  
}