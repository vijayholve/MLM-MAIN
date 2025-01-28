import { useContext, useEffect, useState } from "react";
import Pricing from "../components/card/pricing";
import axios from "axios";
import { UserContext } from "../app";

const Plans = () => {
  const {baseURL} =useContext(UserContext)
  const [Plans,setPlans]= useState({});
  useEffect(async function fetchData() {
    const responce = await axios.get(`${baseURL}/plan/plan-operate/`);
    setPlans(responce.data)
  }
  fetchData()
  ,[plans])

  return (
    <>
<div className="container">
    <Pricing />
</div>
    </>
  );
};

export default Plans;
