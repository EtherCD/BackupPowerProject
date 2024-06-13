import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Charge from "./components/Charge";
import { Provider } from "unistore/preact";
import { infoStore } from "./store";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Provider store={infoStore}>
        <Charge />
      </Provider>
    </div>
  );
}
