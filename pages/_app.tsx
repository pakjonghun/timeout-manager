import type { AppProps } from "next/app";
import store from "../store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-center" limit={1} />
    </Provider>
  );
}

export default MyApp;
