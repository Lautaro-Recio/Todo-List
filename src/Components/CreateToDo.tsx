import { useState } from "react"
import { title } from "../types"
import { toast } from "react-hot-toast"

interface Props {
    setExpirationDateValue: (date: string) => void
    saveTodo: ({ title }: title) => void
    expiration: string
}

export const CreateToDo: React.FC<Props> = ({ saveTodo, setExpirationDateValue, expiration }) => {
    const date = new Date();
    const month: number = date.getMonth() + 1
    const day: number = date.getDate()
    const year: number = date.getFullYear()
    const dateNow = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({ title: inputValue })
        setInputValue("")
        setExpirationDateValue("")
        toast.success("Todo created")
    }
    return (
        <form className="md:flex gap-2 px-2" onSubmit={handleSubmit}>

            <input type="text" className="mb-4 md:w-3/4 w-full p-2 drop-shadow-md border-2 border-gray-200    rounded-md" value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder="What do you want to do?" autoFocus />
            <div className="flex justify-between ">

                <input min={dateNow} type="date" value={expiration} className="px-4" onChange={(e) => setExpirationDateValue(e.target.value)} />
                <button className="border-2 w-24 h-12 border-gray-200 px-4 rounded-md transition-all hover:bg-gray-200 ">Upload</button>
            </div>
        </form>
    )

}