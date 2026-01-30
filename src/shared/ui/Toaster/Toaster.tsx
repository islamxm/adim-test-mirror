import { Slide, ToastContainer } from "react-toastify";

import "./toaster.scss";

export const Toaster = () => {
  return (
    <ToastContainer
      transition={Slide}
      hideProgressBar
      position={"bottom-center"}
      autoClose={4000}
      stacked
      closeOnClick
      limit={3}
      newestOnTop
    />
  );
};
