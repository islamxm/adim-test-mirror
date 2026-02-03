declare global {
  type StoreType = import("./_app/providers/store/config").RootState;
  type DispatchType = import("./_app/providers/store/config").AppDispatch;
}
declare module "next-auth" {
  interface Session {
    refreshToken?: string;
    accessToken?: string;
    id_token?: string | null;
  }
}
export {};
