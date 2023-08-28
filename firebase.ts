import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { ListOfTodos, type Todo } from "./src/types"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_RENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth()
auth.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()

export const setUser = async (user: string) => {
  const myRef = doc(db, "tareas", user)
  await getDoc(myRef).then(docSnap => {
    if (docSnap.exists()) {
      return
    } else {
      setDoc(myRef, { todos: [] })
      console.log(docSnap.data())
    }
  })
}


export const uploadFile = async (file: Todo, user: string) => {
  console.log(file, user)
  const myRef = doc(db, "tareas", user)
  await getDoc(myRef).then(docSnap => {
    if (docSnap.exists()) {
      updateDoc(myRef, {
        todos: arrayUnion(file)
      });
    }
  })

}

export const deleteFile = async (User: string, idLocal: number, todos: ListOfTodos) => {
  const DeleteTodo = todos.filter((element: Todo) => element.id != idLocal)
  console.log(DeleteTodo)
  const myRef = doc(db, "tareas", User)
  await updateDoc(myRef, {
    todos: DeleteTodo
  });

}

export const UpdateCompleted = async (todos:ListOfTodos, User: string) => {
  const myRef = doc(db, "tareas", User)
  await updateDoc(myRef, {
    todos: todos
  });


}