import { toast, Bounce } from "react-toastify";
import { Entry } from "../store/features/entrySlice";
import crypto from 'crypto';
import { ENCRYPTION_KEY, ENCRYPTION_IV } from "./encryption_keys";

export const formatDate = (timestamp: string) => {

    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    });

}

export const getIstDate = () => {

    const date = new Date();

    const IST_offset = 330
    const istDate = new Date(date.getTime() + (IST_offset * 60 * 1000));

    return istDate.toISOString();
}

export const displayToast = (message: string, isError = false) => {
    return isError ? toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }) : toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

}

export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }


export const sortEntriesByLastUpdate = (entries: Entry[]): Entry[] => {

    if(entries.length === 0){
        return []
    }

    return [...entries].sort((a, b) => {
        const aUpdated = new Date(a.updated).getTime();
        const bUpdated = new Date(b.updated).getTime();
        
        if (aUpdated !== bUpdated) {
            return bUpdated - aUpdated; 
        }
        
        const aCreated = new Date(a.created).getTime();
        const bCreated = new Date(b.created).getTime();
        return bCreated - aCreated;
    });
}

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, ENCRYPTION_IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }
  
  export function decrypt(encrypted: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, ENCRYPTION_IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
