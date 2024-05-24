import { Loader } from "./components/Loader";
import { ContextProvider } from "./context/ContextProvider";
import { Container, SoundButton } from "./components";

export default function App() {
  return (
    <ContextProvider>
      <Loader />
      <Container />
      <SoundButton />
    </ContextProvider>
  );
}
