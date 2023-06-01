import InputSearchField from './components/InputField'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="center">
        <InputSearchField />
      </div>
    </main>
  )
}
