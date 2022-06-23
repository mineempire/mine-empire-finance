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
import Inventory from "./pages/Inventory";
import Gades from "./pages/Gades";
import Oberon from "./pages/Oberon";
import CanopsysPrime from "./pages/CanopsysPrime";
import MetamaskProvider from "./MetamaskProvider";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cosmos" element={<Cosmos />} />
          <Route path="/cosmos/gades" element={<Gades />} />
          <Route path="/cosmos/oberon" element={<Oberon />} />
          <Route path="/cosmos/canopsysprime" element={<CanopsysPrime />} />
          <Route path="/market" element={<Market />} />
          <Route path="/refinery" element={<Refinery />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
}

export default App;
