import GlobalStyle, { PageContainer } from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import Cosmos from "./pages/Cosmos";
import Market from "./pages/Market";
import Refinery from "./pages/Refinery";
import Converter from "./pages/Converter";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cosmos" element={<Cosmos />} />
          <Route path="/market" element={<Market />} />
          <Route path="/refinery" element={<Refinery />} />
          <Route path="/converter" element={<Converter />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
}

export default App;
