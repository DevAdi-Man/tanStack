import { Api } from "@/lib/api";
import { User } from "@/types/user.type";

export const userService =  {
    getUser: async() :Promise<User> =>{
        const res = await Api.get('/auth/me')
        return res.data
    }
}