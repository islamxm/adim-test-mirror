import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";

type Props = PropsWithChildren<{
  preloadedState: any;
}>;

export const StoreProvider: FC<Props> = ({ children, preloadedState }) => {
  return <Provider store={preloadedState}>{children}</Provider>;
};
