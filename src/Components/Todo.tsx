import { Todo, todoId, type Todo as TodoType } from "../types"
interface props extends TodoType {
    remove: (id: todoId) => void
    completedFunction: ({ id, completed }: Pick<Todo, "id" | "completed">) => void
}

//Aca estoy tipando las props que le van a llegar al componente con el tipo "Todo" que esta guardado en otro archivo

export const ToDo: React.FC<props> = ({ id, title, completed, remove, completedFunction }) => {
    return (
        <div className="grid grid-cols-3 place-items-center gap-4 m-2 ">

            <input type="checkbox" className="rounded-full m-2  appearance-none checked:bg-green-500  w-8 h-8 border-2 border-gray-400" onChange={(event) => completedFunction({ id, completed: event.target.checked })} checked={completed} />
            {/* El completed lo saco del "Event.target.checked" directamente desde el input */}
            <p>{title}</p>
            <button className="hover:border-red-500 border-gray-400 border-2 px-4 h-10 text-2xl rounded-md transition-all hover:text-red-500 " onClick={(e) => {
                e.preventDefault
                remove({ id })
            }}>X</button>
        </div>

    )
}