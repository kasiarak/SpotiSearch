import styles from "./Song.module.css"
import formatDuration from "../utils/formatDuration";

export default function Song({id, title, album, albumCover, duration}){
    return(
    <div className={styles.songContainer}>
        <h2>{id}</h2>
        <img src={albumCover} alt={album} />
        <h3>{title}</h3>
        <p>Album: {album}</p>
        <p>Duration: {formatDuration(duration)}</p>
    </div>
    );
}