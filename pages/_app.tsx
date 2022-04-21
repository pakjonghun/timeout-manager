import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { toast, ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((res) =>
              res.json().catch(() => toast.error("Unknown Error"))
            ),
          onError: (error: unknown, key: string) => {
            toast.error("SWR OnError");
          },
        }}
      >
        <Component {...pageProps} />
        <ToastContainer position="bottom-center" limit={1} />
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
