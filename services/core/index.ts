import { Http } from "@/configs/http/http-method";
import { Todo } from "@/types/todo";

export const Apis = {
  auth: {
    login: (payload: any) => Http.post("/api/auth/signIn", payload),
    register: (payload: any) => Http.post("/api/auth/signUp", payload),
  },
  todos: {
    get: (params?: any) => Http.get<IResponse<Todo[]>>("/todos", params),
    getDetail: (id: string | number) =>
      Http.get<IResponse<Todo>>(`/todos/${id}`),
    create: (payload: any) => Http.post("/todos/create", payload),
    update: (id: string | number, payload: any) =>
      Http.put(`/todos/${id}`, payload),
    remove: (id: string | number) => Http.delete(`/todos/${id}`),
  },
};
