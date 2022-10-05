import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SigninButton() {

  const session = true;

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => { }}
    >
      <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Foto do usuário Logado" />
      Olá FeijaoGuida
      <FiX color="#FFB800" className={ styles.closeIcon } />
    </button>
  ) : (
    <button
    type="button"
    className={styles.signInButton}
    onClick={() => { }}
  >
    <FaGithub color="#FFB800" />
    Entrar com github
  </button>
  )
}