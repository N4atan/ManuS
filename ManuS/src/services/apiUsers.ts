

export const readUser = async () => {
    try {
        const docSnap = await getDoc(doc(db, "users", {}));

    } catch (error) {
        console.error("Error reading user:", error);
    }
}