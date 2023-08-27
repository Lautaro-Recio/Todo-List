import { Filters } from "./Filters"
import { values } from "../consts"

interface Props {
    activeCount:number
    completedCount:number
    filterSelected:values
    onClearCompleted: ()=> void
    handleFilterChange:(filter:values) => void
}
export const Footer: React.FC<Props> = (
    {
        activeCount=0,
        completedCount=0,
        filterSelected,
        handleFilterChange,
        onClearCompleted
    }

) => {

    return (
        <footer>
            <span>
                <strong>{activeCount}-</strong>
                Tareas pendientes
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

            {completedCount > 0 && (
                <button
                onClick={onClearCompleted}
                >
                    Borrar completos
                </button>
            )}
        </footer>
    )

}
