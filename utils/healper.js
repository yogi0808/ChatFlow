import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (uri) => {
    try {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);

        // Prepare file for upload
        const response = await fetch(uri);
        const blob = await response.blob();

        // Firebase storage reference and file path
        const storageRef = ref(storage, `images/${filename}`);

        // Upload image to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get download URL of uploaded image
        const downloadUrl = await getDownloadURL(storageRef);

        return downloadUrl;
    } catch (error) {
        console.error("Error uploading image: ", error);
        return null;
    }
}

export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

export function formatDateTime(timestamp, onlyTime = false) {
    // Convert Firestore Timestamp to Date object
    const givenDate = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));

    const now = new Date();
    const diffHours = (now - givenDate) / (1000 * 60 * 60);

    if (diffHours < 12 || onlyTime) {
        // Format time in hh:mm AM/PM
        const hours = givenDate.getHours();
        const minutes = givenDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } else {
        // Format date in dd/mm/yy
        const day = String(givenDate.getDate()).padStart(2, '0');
        const month = String(givenDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = String(givenDate.getFullYear()).slice(-2); // Get last two digits of the year

        return `${day}/${month}/${year}`;
    }
}