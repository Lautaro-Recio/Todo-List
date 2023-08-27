import { useEffect, useState } from 'react'
import './App.css'
import { ToDos } from './Components/ToDos'
import { Todo, title, todoId } from './types'
import { TODO_FILTER, values } from './consts'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'

const mockTodos = [
  { id: 1, title: 'Learn ReactTS', completed: false },
  { id: 2, title: 'Learn Js', completed: true },
  { id: 3, title: 'Learn ReactJS', completed: true },

]

function App() {
  const [todos, setTodos] = useState(mockTodos)
  const [Filter, setFilters] = useState<values>(TODO_FILTER.ALL)

  useEffect(() => {
    setTodos(mockTodos)
  }, [])

  const remove = ({ id }: todoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
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
    setTodos(newTodos)
  }


  const handleFilterChange = (filter: values): void => {
    setFilters(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
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
    const newTodo = {
      title,
      id: getRandomInt(9999),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <>
      <div className='h-screen w-screen min-w-screen grid place-items-center overflow-hidden bg-gray-300'>
        <div className='bg-white drop-shadow-lg w-2/3 rounded-md p-4'>

          <Header onAddTodo={handleAddToDo} />
          <ToDos remove={remove} todos={filterTodos} completedFunction={completed} />
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filterSelected={Filter}
            onClearCompleted={handleRemoveAllCompleted}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>

    </>
  )
}

export default App
