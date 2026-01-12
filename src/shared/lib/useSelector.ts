import { TypedUseSelectorHook, useSelector as s } from "react-redux";

export const useSelector: TypedUseSelectorHook<StoreType> = s;
