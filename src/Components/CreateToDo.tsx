import { useState } from "react"
import { title } from "../types"

interface Props {
    saveTodo: ({ title }: title) => void
}

export const CreateToDo: React.FC<Props> = ({ saveTodo }) => {

    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({ title: inputValue })
        setInputValue("")
    }
    return (
        <form onSubmit={handleSubmit}>

            <input type="text" className="mb-4 w-full p-2 drop-shadow-md border-2 border-gray-200    rounded-md" value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder="Que quieres hacer?" autoFocus />

        </form>
    )

}