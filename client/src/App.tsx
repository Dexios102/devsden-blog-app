import { ThemeProvider } from "./components/theme/theme-provider";
import Layout from "./layout/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout />
    </ThemeProvider>
  );
}

export default App;
