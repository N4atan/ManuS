import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

import type { Service } from "../models/service";

export const readServices = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "services"));

        const servicesList: Service[] = querySnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            } as Service;
        });

        return servicesList;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
}

export const createService = async (service: Partial<Service>) => {
    try {
        const docRef = await addDoc(collection(db, "services"), service);

        console.log("Service created with ID: ", docRef.id);
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
}


export const updateService = async (id: string, service: Partial<Service>) => {
    try {
        const docRef = doc(db, "services", id);

        await updateDoc(docRef, service);
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};