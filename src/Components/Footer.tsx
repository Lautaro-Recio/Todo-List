import { Filters } from "./Filters"
import { values } from "../consts"

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: values
    onClearCompleted: () => void
    handleFilterChange: (filter: values) => void
   
}
export const Footer: React.FC<Props> = (
    {
        activeCount = 0,
        completedCount = 0,
        filterSelected,
        handleFilterChange,
        onClearCompleted,
        
    }

) => {

    return (
        <footer>
            <div className=" grid grid-cols-3 p-4">

                <span>
                    <strong> {activeCount}- </strong>
                    Todos pending
                </span>

            </div>
            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />


            <button
                disabled={completedCount > 0 ? false : true}
                className="border-2 border-gray-200 p-2 rounded-md hover:bg-gray-400 transition-all disabled:cursor-no-drop"
                onClick={onClearCompleted}
            >
                Delete completions
            </button>

        </footer>
    )

}
