import GlobalStyle from "./globalStyles";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
