declare global {
  type StoreType = import('./_app/providers/store/config').RootState
  type DispatchType = import('./_app/providers/store/config').AppDispatch
  // type DefFunc = (...args:any[]) => any
}
declare module "next-auth" {
  interface Session {
    refreshToken?: string,
    accessToken?: string
  }
}
export {}