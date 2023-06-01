import React, { useState, useEffect, Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Image from "./assets/img/register_bg_2.png";

import Home from "./pages/Home";
import New from "./pages/New";
import Web3 from "web3";
import AppContext from "./appContext";
import TwitterDapp from "./abis/TwitterDapp.json";
import Navbar from "./components/CustomNavbar";
import Update from "./pages/Update";

function App() {
  const [dependencies, setDependencies] = useState({
    web3: null,
    account: null,
    data: null,
    loaded: false,
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  useEffect(() => {
    loadWeb3();
    (async function () {
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const networkData = TwitterDapp.networks[networkId];

      //console.log(networkData);
      const data = new web3.eth.Contract(TwitterDapp.abi, networkData.address);
      console.log(data);

      const [account] = await web3.eth.getAccounts();

      setDependencies((previousState) => ({
        ...previousState,
        web3,
        account,
        data,
        loaded: true,
      }));
    })();
  }, []);

  /**
   * @description Abstraction for connecting user to application;
   * this is shown to the user if they are not initially connected
   * on load
   */
  const connect = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const { web3 } = dependencies;
    const [account] = await web3.eth.getAccounts();
    setDependencies((previousState) => ({ ...previousState, account }));
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ dependencies }}>
             
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/new" element={<New />} />
                <Route exact path="/update:id" element={<Update />} />
              </Routes>
          
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
