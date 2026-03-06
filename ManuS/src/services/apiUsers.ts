import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { User } from "../models/user";


export const readUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const usersList: User[] = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data
        } as User;
    });

    console.table(usersList);
}

export const readUserByEmail = async (email: string): Promise<User | null> => {
    const docRef = doc(db, "users", email);
    const docSnapshot = await getDoc(docRef);
    

    if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        return {
            id: docSnapshot.id,
            ...userData
        } as User;
    }

    return null;
};