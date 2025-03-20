import styles from "./Album.module.css"

export default function Album({ cover, title, release_date }){
    return(
    <div className={styles.albumCard}>
        <img src={cover} alt={title} />
        <h3>{title}</h3>
        <p>{release_date}</p>
    </div>
    );
}