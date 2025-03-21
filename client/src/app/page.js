import styles from "./page.module.css";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>SpotiSearch</h1>
      <SearchBar/>
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>Check out the most popular songs from this artist and discover their biggest hits!</div>
        <div className={styles.separator}></div>
        <div className={styles.infoBox}>Explore the artist's discography and listen to their best albums.</div>
        <div className={styles.separator}></div>
        <div className={styles.infoBox}>Find upcoming concerts and events to see this artist live!</div>
    </div>
    </div>
  );
}
