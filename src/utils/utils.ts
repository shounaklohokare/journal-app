import { toast, Bounce } from "react-toastify";
import { Entry } from "../store/features/entrySlice";
import { ENCRYPTION_KEY } from "./encryption_keys";
import CryptoJS from 'crypto-js';

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

export const encrypt = (plainText: string): string => {
    return CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY).toString();
  };

export const decrypt = (cipherText: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };