import React, { useEffect, useState } from "react";
import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";

export let isConnected = false;
export let accountAddress = "";

function MetamaskProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {});
  if (loaded) {
    return children;
  }
  return <>Loading</>;
}

export default MetamaskProvider;
