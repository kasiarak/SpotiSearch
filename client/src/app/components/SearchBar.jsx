import styles from "./SearchBar.module.css"
import { DM_Sans } from "next/font/google"; 
const dm_sans = DM_Sans({ subsets: ['latin'], weight: ['500'] });

export default function SearchBar(){
    return(
        <div className={styles.searchBar}>
            <button><img src="magnifying-glass-svgrepo-com.svg"/></button>
            <input className={dm_sans.className} placeholder="Search for an artist..."></input>
        </div>
    );  
}