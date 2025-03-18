import styles from "./page.module.css";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>SpotiSearch</h1>
      <SearchBar/>
    </div>
  );
}
