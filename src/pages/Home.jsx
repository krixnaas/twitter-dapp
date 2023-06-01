import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Web3 from "web3";
import AppContext from "../appContext";
import Card from "../components/Card";
import Feed from "../components/Feed";
import Siderbar from "../components/Sidebar";
import Container from "../layout/Container";

const Home = () => {
  const [cause, setCause] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dependencies } = useContext(AppContext);
  const { data, account } = dependencies;

  const getData = async () => {
    // const homeData = await data.methods.getHomeData().call();
    //console.log(homeData);
    //return homeData;
    //return constructcauseArray(homeData);
  };
  useEffect(() => {
    (async function () {
      // setupCreatePostListener();
      setCause(await getData());
      setLoading(true);
    })();
  }, []);

  return (
    <div className="flex min-h-screen mx-auto max-w-7xl flex-row">
      <Siderbar/>
      <Feed/>
    </div>
  );
};
export default Home;
