import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/contact">Pulsa aquí para ver los contactos</Link>
    </div>
  );
}
