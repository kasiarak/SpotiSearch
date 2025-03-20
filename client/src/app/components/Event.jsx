import styles from "./Event.module.css";

export default function({url, name, date, venue, city, country, image}){
    return(
        <div className={styles.eventContainer}>
            <div>
                {image && <img src={image} alt={name || "Event image"} />}
            </div>
            <div className={styles.eventInfo}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {name || "Unnamed Event"}
                </a>
                {date && <p>Date: {date}</p>}
                {venue && <p>Venue: {venue}</p>}
                {(city || country) && (
                    <p>Location: {city}{city && country ? ", " : ""}{country}</p>
                )}
            </div>
        </div>
    );
}