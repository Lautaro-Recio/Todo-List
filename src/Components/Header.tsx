import { title } from "../types"
import { CreateToDo } from "./CreateToDo"
import { SignIn } from "./SignIn"

interface Props {
    newUser: string
    setExpirationDateValue: (date: string) => void
    getUser: (user: string) => void
    expiration: string
    onAddTodo: ({ title }: title) => void
}

export const Header: React.FC<Props> = ({ onAddTodo, getUser, newUser, setExpirationDateValue, expiration }) => {

    return (
        <header >
            <div className="grid grid-cols-2  my-4">
                <h1 className="text-4xl font-bold mb-4">Todo list</h1>
                <SignIn newUser={newUser} getUser={getUser} />
            </div>
            {!newUser && (<p className="text-red-500 ">You must be logged in to create a ToDo!</p>) ||
                <CreateToDo expiration={expiration} setExpirationDateValue={setExpirationDateValue} saveTodo={onAddTodo} />
            }
        </header>

    )

}