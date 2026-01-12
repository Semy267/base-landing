import { Http } from "@/configs/http/http-method";

export const Apis = {
  auth: {
    login: (payload: any) => Http.post("/api/auth/signIn", payload),
    register: (payload: any) => Http.post("/api/auth/signUp", payload),
  },
};
