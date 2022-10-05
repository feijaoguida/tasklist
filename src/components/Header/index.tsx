import Link from 'next/link'
import { SigninButton } from '../SigninButton'
import styles from './styles.module.scss'



export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
      <Link href="/">      
        <img src="/images/logo.svg" alt="Logo Task List" />
          </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/tasks">
            
          <a>Tarefas</a>
          </Link>
        </nav>
        <SigninButton />
        
      </div>
    </header>
  )
}