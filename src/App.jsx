import { Loader } from "./components/Loader";
import { ContextProvider } from "./context/ContextProvider";
import { Container } from "./components";

export default function App() {
  return (
    <ContextProvider>
      {/* <Loader /> */}
      <Container />
    </ContextProvider>
  );
}
