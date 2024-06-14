import { useEffect } from "preact/hooks";
import Header from "./components/Header";
import ChargeDisplay from "./components/ChargeDisplay";
import { Provider } from "unistore/preact";
import { infoStore } from "./store";
import axios from "axios";
import LoadDisplay from "./components/LoadDisplay";

const URI = new URL(window.location + "").origin
  .replace("5173", "4002")
  .replace("4173", "4002");

export function App() {
  useEffect(() => {
    const getInfoFromBackend = () => {
      axios.get(URI + "/info").then((v) => void infoStore.setState(v.data));
    };

    getInfoFromBackend();
    const i = setInterval(getInfoFromBackend, 5000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div>
      <Header />
      <div
        className={
          "grid md:grid-cols-3 grid-rows-3 grid-cols-1 justify-items-center gap-10 my-10"
        }
      >
        <Provider store={infoStore}>
          <ChargeDisplay />
        </Provider>
        <Provider store={infoStore}>
          <LoadDisplay />
        </Provider>
      </div>
    </div>
  );
}
