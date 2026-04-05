import {Api} from '@/lib/api';
import {LoginRequest, LoginResponse} from '@/types/auth.type';

export const authServices = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await Api.post('/auth/login', data);
    return res.data;
  },
};
