import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
    </>
  );
}

export default App;
