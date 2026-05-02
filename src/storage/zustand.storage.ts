import { Platform } from "react-native";
import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const tokenStorage = createMMKV({
    id:"token-storage",
    ...(Platform.OS !== 'web' && { encryptionKey: 'my-encryption-key' })
});

const storage = createMMKV({
    id:"my-app-storage",
    ...(Platform.OS !== 'web' && { encryptionKey: 'your-secret-key' })
});

const zustandStorage:StateStorage = {
    setItem : (name,value)=>{
        return storage.set(name,value)
    },
    getItem : (name) =>{
        const value = storage.getString(name);
        return value ??  null;
    },
    removeItem : (name) =>{
        return storage.remove(name)
    }
}

export default zustandStorage
