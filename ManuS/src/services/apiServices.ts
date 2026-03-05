import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import type { Service } from "../models/service";

export const readServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));

    console.log(querySnapshot)

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });

    const servicesList: Service[] = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            ...data,
            id: doc.id
        } as Service;
    });

    console.table(servicesList);
}

export const createService = async (service: Partial<Service>) => {
    try {
        const docRef = await addDoc(collection(db, "services"), service);

        console.log("Service created with ID: ", docRef.id);
    } catch (error) {
        console.error("Error creating service:", error);
    }
}