import { collection, onSnapshot, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

export const observeServices = (callback: (services: Service[]) => void) => {
    // onSnapshot cria um Web Socket e fica ouvindo por mudanças
    const unsubscribe = onSnapshot(collection(db, "services"), (querySnapshot) => {
        const servicesList: Service[] = querySnapshot.docs.map(doc => {
            const data = doc.data();

            data.created_at = data.created_at.split('T')[0];

            return {
                id: doc.id,
                ...data
            } as Service;
        });

        callback(servicesList);
    }, (error) => {
        console.error("Error observing services:", error);
    });

    return unsubscribe;
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


export const deleteService = async (id: string) => {
    try {
        const docRef = doc(db, "services", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};