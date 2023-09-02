import { toast } from "react-hot-toast";

import { Todo, todoId, type Todo as TodoType } from "../types"
interface props extends TodoType {
    remove: (id: todoId) => void
    completedFunction: ({ id, completed }: Pick<Todo, "id" | "completed">) => void

}



//Aca estoy tipando las props que le van a llegar al componente con el tipo "Todo" que esta guardado en otro archivo

export const ToDo: React.FC<props> = ({ id, title, completed, expirationDate, remove, completedFunction, dateNow }) => {

    function compararFechas(fecha1: Date, fecha2: Date): number {
        const diferenciaEnMilisegundos = Math.abs(fecha1.getTime() - fecha2.getTime());
        const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

        if (fecha1 < fecha2) {
            if (diferenciaEnDias <= 3) {
          
                return 1 //fecha menor a 3 dias de vencimiento
            }
            

            return 2; //faltan mas de 5 dias para vencimiento
        } else if (fecha1 > fecha2) {
            return 0; // fecha vencida
        } else {
            return 1; // las fechas son iguales
        }
    }

    const date = new Date();

    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const primeraFecha = new Date(`${year}-0${month}-${day}`);
    const segundaFecha = new Date(expirationDate);

    return (
        <div className="grid md:grid-cols-7 grid-cols-5 place-items-center text-sm gap-4 m-2 ">
            <p>{dateNow}</p>
            <input type="checkbox" className="rounded-full m-2  appearance-none checked:bg-green-500  md:w-8 md:h-8 w-4 h-4 border-2 border-gray-400" onChange={(event) => completedFunction({ id, completed: event.target.checked })} checked={completed} />
            {/* El completed lo saco del "Event.target.checked" directamente desde el input */}
            <p className="md:col-span-3 text-base">{title}</p>
            <p className={`${compararFechas(primeraFecha, segundaFecha) === 2 ? 'text-green-500' : compararFechas(primeraFecha, segundaFecha) === 1 ? "text-yellow-500" : 'text-red-500 font-bold'}`}>{expirationDate}</p>
            <button className="hover:border-red-500 border-gray-400 border-2 md:px-4 md:h-10 h-10 w-10 text-lg md:text-2xl rounded-md transition-all hover:text-red-500 " onClick={(e) => {
                e.preventDefault
                remove({ id })
                toast.success("Todo eliminated")

            }}>X</button>
        </div>

    )
}