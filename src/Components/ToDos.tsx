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
        <ul className="w-full">
            {todos.map(todo => (
                <li key={todo.id}>
                    <ToDo
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        remove={remove}
                        completedFunction={completedFunction}
                    />
                </li>
            ))}
        </ul>
    )
}

