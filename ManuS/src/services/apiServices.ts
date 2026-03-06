import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import type { Service } from "../models/service";

export const readServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));

    const servicesList: Service[] = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data
        } as Service;
    });

    return servicesList;
}

export const createService = async (service: Partial<Service>) => {
    try {
        const docRef = await addDoc(collection(db, "services"), service);

        console.log("Service created with ID: ", docRef.id);
    } catch (error) {
        console.error("Error creating service:", error);
    }
}