import Head from "next/head";
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash2, FiClock } from 'react-icons/fi'

export default function Tasks() {
  return (
    <>
      <Head>
        <title>Minhas tarefas - TaskList</title>
      </Head>
      <main className={styles.container}>
        <form>
          <input type="text" placeholder="Digite sua tarefa..." />
          <button type="submit">
            <FiPlus size={25} color="#17181F" />

          </button>
        </form>

        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>Aprender Criar Projetos NextJs</p>
            <div className={styles.actions} >
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>17 Junho 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash2 size={20} color="#FF3636" />
              </button>
            </div>
          </article>

          <article className={styles.taskList}>
            <p>Aprender Criar Projetos NextJs</p>
            <div className={styles.actions} >
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>17 Junho 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash2 size={20} color="#FF3636" />
              </button>
            </div>
          </article>

          <article className={styles.taskList}>
            <p>Aprender Criar Projetos NextJs</p>
            <div className={styles.actions} >
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>17 Junho 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash2 size={20} color="#FF3636" />
              </button>
            </div>
          </article>
        </section>
      </main> 
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoior esse projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>
            Última doação foi a 3 dias.
          </time>
        </div>
      </div>
    </>
  )
}