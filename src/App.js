import GlobalStyle, { PageContainer } from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farms" element={<Farms />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
}

export default App;
