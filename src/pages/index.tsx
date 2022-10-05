import Head from "next/head";
import styles from "../styles/styles.module.scss"

export default function Home() {
  return (
    <>
      <Head>
        <title>Lista de Tarefas - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/to_do_list.svg" alt="Home Ferramenta Task List" />
        <section className={styles.callToAction}>
          <h1>Uma ferramenta para o seu dia a dia, Escreva, Planeje e Organize-se...</h1>
          <p>
            <span>100% Gratuida</span> e online.
          </p>
        </section>

        <div className={styles.donaters}>
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
          <img src="https://avatars.githubusercontent.com/u/6312819?v=4" alt="Usuario 1" />
        </div>
      </main>
    </>
  )
}