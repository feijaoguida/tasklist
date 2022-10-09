import Head from "next/head";
import {FormEvent, useState} from 'react'
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash2, FiClock, FiX } from 'react-icons/fi'
import { SupportButton } from "../../components/SupportButton";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import firebase from '../../services/firebaseConnections'
import { format } from "date-fns";
import Link from "next/link";

interface TaskProps{
  user: {
    id: string,
    nome: string,
  },
  data: string
}
interface dataTaskList {
    id: string;
    created: Date;
    createdFormated: string;
    tarefa: string;
    userId: string;
    nome: string;
    finaliza: boolean;
    updateAt: Date;
}

export default function Tasks({ user, data }: TaskProps) {
  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<dataTaskList[]>(JSON.parse(data))
  const [taskEdit, setTaskEdit] = useState<dataTaskList | null>(null)

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (input === '') {
      alert("Preencha alguma tarefa!!!")
      return
    }

    if (taskEdit) {
      await firebase.firestore().collection('tarefas')
        .doc(taskEdit.id)
        .update({
          tarefa: input,
          updateAt: new Date(),  
        })
        .then(() => {
          let data = taskList;
          let taskIndex = taskList.findIndex(item => item.id === taskEdit.id);
          data[taskIndex].tarefa = input;

          setTaskList(data);
          setTaskEdit(null)
          setInput('');
        })
      
      return;
     }

    await firebase.firestore().collection('tarefas')
      .add({
        created: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.nome,
        finalizado: false,
        updateAt: new Date(),
      })
      .then((doc) => {
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          tarefa: input,
          userId: user.id,
          nome: user.nome,
          finaliza: false,
          updateAt: new Date()
        }
        setInput('')
        setTaskList([...taskList, data])
        console.log("Cadastrado com Sucesso!")
      }).catch((err) => {
      console.log("Erro ao cadastrar: ", err)
    })
  }

  async function handleDelete(id:string) {
    await firebase.firestore().collection('tarefas').doc(id)
      .delete()
      .then(() => {
        console.log("Deletado com sucesso!")
        let taskDeleted = taskList.filter(item => {
          return (item.id !== id)
        })

        setTaskList(taskDeleted )
      })
      .catch((error) => {
      console.log("Erro ao Excluir - ", error)
    })
  }

  async function handleEdit(task:dataTaskList) {
    setTaskEdit(task)
    setInput(task.tarefa)

  }

  async function handleCancelEdit() {
    setTaskEdit(null)
    setInput('')
  }
  return (
    <>
      <Head>
        <title>Minhas tarefas - TaskList</title>
      </Head>
      <main className={styles.container}>
        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={() => handleCancelEdit()}>
              <FiX size={30} color="#FF3636" />
            </button>
            Você esta editando uma tarefa!
          </span>
        )}

        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            value={input}
            onChange={ (e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181F" />

          </button>
        </form>

        <h1>Você tem {taskList.length} { taskList.length <= 1 ? "tarefa" : "tarefas"}!</h1>

        <section>
          {
            taskList.map(task => (
              <article key={task.id } className={styles.taskList}>
                <Link href={`/tasks/${task.id}`}>
                  <p>{ task.tarefa }</p>
                
                </Link>
                <div className={styles.actions} >
                  <div>
                    <div>
                      <FiCalendar size={20} color="#FFB800" />
                      <time> {task.createdFormated }</time>
                    </div>
                    <button onClick={() => handleEdit(task)}>
                      <FiEdit2 size={20} color="#FFF" />
                      <span>Editar</span>
                    </button>
                  </div>
                  <button onClick={ () => handleDelete(task.id)}>
                    <FiTrash2 size={20} color="#FF3636" />
                  </button>
                </div>
              </article>

            ))
          }
          
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
      <SupportButton />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const tasks = await firebase.firestore().collection('tarefas')
  .where('userId', '==', session?.id )
  .orderBy('created', 'asc').get();

  const data = JSON.stringify(tasks.docs.map(t => {
    return {
      id: t.id,
      createdFormated: format(t.data().created.toDate(), 'dd MMMM yyyy'),
      ...t.data(),
    }
  }))

  const user = {
    nome: session?.user.name,
    id: session?.id
  }
  
  return {
    props: {
      user,
      data
    }
  }
}