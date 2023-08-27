
export type Todo = {
    id: number
    title: string
    completed: boolean
}
export type completed = Pick<Todo, "completed">
export type title = Pick<Todo, "title">

export type todoId = Pick<Todo, "id">
// Con pick tomo el tipo de id del type "Todo"

export type ListOfTodos = Todo[]

