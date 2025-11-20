declare global {
  type StoreType = import('./_app/providers/store/config').RootState
  type DispatchType = import('./_app/providers/store/config').AppDispatch
  // type DefFunc = (...args:any[]) => any
}
export {}