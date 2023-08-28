import { FULTERS_BUTTONS, values } from "../consts"

interface Props {
    filterSelected: values
    onFilterChange: (filter: values) => void
    //aca tipa el tipo de la key del array Todo_Filter
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {




    return (

        <>
            <ul className="grid grid-cols-3 gap-2">

                {Object.entries(FULTERS_BUTTONS).map(([key, { literal, href }]) => {
                    const isSelected = key == filterSelected


                    return (
                        <li className="p-4" key={key}>
                            <a
                                className={`p-2 rounded-md ${isSelected ? "bg-gray-400 font-bold" : "bg-gray-200"}`}
                                href={href}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onFilterChange(key as values)
                                }}
                            >

                                {literal}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}