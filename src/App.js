import GlobalStyle, { PageContainer } from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import Farms from "./pages/Farms";

function App() {
  const switchNetwork = async () => {
    if (window.ethereum.networkVersion !== 250) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xfa" }],
        });
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Fantom Testnet",
                chainId: "0xfa",
                nativeCurrency: {
                  name: "Fantom Opera Mainnet",
                  decimals: 18,
                  symbol: "FTM",
                },
                rpcUrls: ["https://rpc.fantom.network/"],
                blockExplorerUrls: ["https://ftmscan.com/"],
              },
            ],
          });
        }
      }
    }
  };

  useEffect(() => {
    switchNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
