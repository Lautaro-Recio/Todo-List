import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, setUser } from "../../firebase";


interface Props {
    newUser: string
    getUser: (user: string) => void
}

export const SignIn: React.FC<Props> = ({ getUser,newUser }) => {

    

    const SignWhitGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
        const email = auth.currentUser?.email;
        setUser(email!)
        getUser(email!)
    };
    const signOut = async () => {
        auth.signOut
        getUser("")
    };
    return (
        <>
            {!newUser ? (


                <button className=" border-2 border-gray-400 rounded-md" onClick={SignWhitGoogle}>

                    <p className="flex justify-center items-center text-lg hover:bg-gray-400 group hover:text-white transition-all">
                        <strong className="text-4xl text-bold group-hover:text-white text-gray-400 p-2">
                            G
                        </strong>
                        Sign in With Google
                    </p>

                </button>
            ) : (

                <button className=" border-2 border-gray-400 rounded-md" onClick={signOut}>

                    <p className="flex justify-center items-center text-lg hover:bg-gray-400 group hover:text-white transition-all">
                        <strong className="text-4xl text-bold group-hover:text-white text-gray-400 p-2">
                            G
                        </strong>
                        Sign Out
                    </p>

                </button>
            )
            }
        </>

    )
}