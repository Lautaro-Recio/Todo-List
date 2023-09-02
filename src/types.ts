
export type Todo = {
    id: number
    title: string
    completed: boolean
    expirationDate: string
    dateNow: string

}

export type TodoByDates = {
    id: number
    title: string
    completed: boolean
    expirationDate: Date
    dateNow: Date

}

export type completed = Pick<Todo, "completed">
export type title = Pick<Todo, "title">

export type todoId = Pick<Todo, "id">
// Con pick tomo el tipo de id del type "Todo"

export type ListOfTodos = Todo[]

