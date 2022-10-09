import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client";
import firebase from '../../services/firebaseConnections';
import { format } from 'date-fns'

type Task = {
    id: string;
    created: Date;
    createdFormated: string;
    tarefa: string;
    userId: string;
    nome: string;
    finaliza: boolean;
    updateAt: Date;
}

interface TaskListProps {
  data: string
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;

  return (
    <div>
      <h1>Detalhe</h1>
      <h2>{ task.tarefa }</h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const session = await getSession({ req })
  
  if (!session?.id) {
    return {
      redirect: {
        destination: '/tasks',
        permanent: false,
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        created: snapshot.data().created,
        createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        nome: snapshot.data().nome,
        updateAt: snapshot.data().updateAt,
        updateAtFormated: format(snapshot.data().updateAt.toDate(), 'dd MMMM yyyy'),
        finalizado: snapshot.data().finalizado
      }
      return JSON.stringify(data);
    })
  
  return {
    props: {
      data
    }
  }
}