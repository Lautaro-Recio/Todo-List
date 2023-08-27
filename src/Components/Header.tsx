import { title } from "../types"
import { CreateToDo } from "./CreateToDo"

interface Props {
    onAddTodo: ({title}:title) =>void
}

export const Header: React.FC<Props> = ({onAddTodo}) =>{

    return(
        <header>
            <h1 className="text-4xl font-bold mb-4">To-do list</h1>
            <CreateToDo saveTodo={onAddTodo}/>
        </header>
        
    )

}