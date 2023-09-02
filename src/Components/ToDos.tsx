import { todoId, type ListOfTodos, Todo } from "../types"
import { ToDo } from "./Todo"

//Aca estoy tipando las props que le van a llegar al componente con el tipo "ListOfTodos" que esta guardado en otro archivo y es un tipo de un array con distintos valores

interface props {
    todos: ListOfTodos
    remove: (id: todoId) => void
    completedFunction: ({ id, completed }: Pick<Todo, "id" | "completed">) => void
    //Aca estoy tipando la funcion remove que viene por las props (que ya estan tipadas tambien)
}
export const ToDos: React.FC<props> = ({ todos, remove, completedFunction }) => {
    return (
        <ul className="w-full overflow-y-auto max-h-72 ">
            <li>
                <div className=" md:text-lg text-base md:font-bold py-2 grid md:grid-cols-7 grid-cols-5 place-items-center gap-4 md:m-2 border-b-2 border-gray-200">
                    <p>Start</p>
                    <p>Completed</p>
                    <p className="md:col-span-3">Todo</p>
                    <p>Expiration</p>
                    <p>Delete</p>
                </div>
            </li>
            {todos.map(todo => (
                <li key={todo.id}>
                    <ToDo
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        expirationDate={todo.expirationDate}
                        dateNow={todo.dateNow}
                        remove={remove}
                        completedFunction={completedFunction}
                    />
                </li>
            ))}
        </ul>
    )
}

