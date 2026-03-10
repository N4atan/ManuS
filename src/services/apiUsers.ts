import { collection, deleteDoc, getDocs, onSnapshot, query, updateDoc, addDoc, where, doc } from "firebase/firestore";
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

export const createUser = async (user: Omit<User, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("User created with ID: ", docRef.id);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const observeUsers = (callback: (users: User[]) => void) => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersList: User[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            usersList.push({
                id: doc.id,
                ...data
            } as User);
        });

        callback(usersList);
    });

    return unsubscribe;
};



export const readUserByEmail = async (email: string): Promise<User | null> => {
    const q = query(
        collection(db, "users"),
        where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
        id: doc.id,
        ...data
    } as User;
}


export const updateUser = async (id: string, user: Partial<User>) => {
    try {
        const docRef = doc(db, "users", id);

        await updateDoc(docRef, user);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (item: User) => {
    try {
        const docRef = doc(db, "users", item.id!);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}; 