import { useEffect, useState } from 'react'
import './App.css'
import { ToDos } from './Components/ToDos'
import { ListOfTodos, Todo, title, todoId } from './types'
import { TODO_FILTER, values } from './consts'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { UpdateCompleted, db, deleteFile, uploadFile } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Toaster } from 'react-hot-toast'


function App() {
  const [todos, setTodos] = useState<ListOfTodos>([])
  const [Filter, setFilters] = useState<values>(TODO_FILTER.ALL)
  const [newUser, setNewUser] = useState("")
  const [expiration, setExpirationDate] = useState("")
  

  const getData = async (user: string) => {
    const myRef = doc(db, "tareas", user)
    const dbCollection = await getDoc(myRef)
    try {
      const booksOnFirebase: ListOfTodos = [];
      dbCollection.data()?.todos.forEach((doc: Todo) => {
        booksOnFirebase.push(doc)
      });
      setTodos(booksOnFirebase)
    }
    catch {
      console.log("Error")
    }
  }
 
  useEffect(() => {
    
    getData(newUser)
  }, [newUser])

  const remove = ({ id }: todoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    deleteFile(newUser, id, todos)

  }

  const completed = ({ id, completed }: Pick<Todo, "id" | "completed">): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo

    })
    UpdateCompleted(newTodos, newUser)
    setTodos(newTodos)
  }




  const handleFilterChange = (filter: values): void => {
    setFilters(filter)
  }
  const setExpirationDateValue = (date: string): void => {
    setExpirationDate(date)
  }
  const signIn = (user: string): void => {
    setNewUser(user)
  }
  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    console.log(newTodos)
    setTodos(newTodos)
    UpdateCompleted(newTodos, newUser)

  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filterTodos = todos.filter(todo => {
    if (Filter === TODO_FILTER.ACTIVE) return !todo.completed
    if (Filter === TODO_FILTER.COMPLETED) return todo.completed
    return todo
  })

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  const handleAddToDo = ({ title }: title): void => {
    const date = new Date();

    const month: number = date.getMonth() + 1
    const day: number = date.getDate()
    const year: number = date.getFullYear()
    const dateNow = `${year}-${month}-${day}`
    const expirationDate = expiration.substring(0, 10)
    const newTodo = {
      title,
      id: getRandomInt(9999999999),
      completed: false,
      expirationDate,
      dateNow

    }
    uploadFile(newTodo, newUser)
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)

  }


  return (
    <>
      <div className='h-screen w-screen min-w-screen grid place-items-center overflow-hidden bg-gray-300'>
        <div className='bg-white drop-shadow-lg w-475 rounded-md md:p-4 p-2'>

          <Header expiration={expiration} setExpirationDateValue={setExpirationDateValue} getUser={signIn} newUser={newUser} onAddTodo={handleAddToDo} />
          {newUser && (

            <>
              <ToDos  remove={remove} todos={filterTodos} completedFunction={completed} />
              <Footer
               
                activeCount={activeCount}
                completedCount={completedCount}
                filterSelected={Filter}
                onClearCompleted={handleRemoveAllCompleted}
                handleFilterChange={handleFilterChange}
              />
            </>
          )
          }
          <Toaster />
        </div>
      </div>

    </>
  )
}

export default App
