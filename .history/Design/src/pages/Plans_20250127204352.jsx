import { useContext, useEffect, useState } from "react";
import Pricing from "../components/card/pricing";
import axios from "axios";
import { UserContext } from "../app";

const Plans = () => {
  const {baseURL} =useContext(UserContext)
  const [Plans,setPlans]= useState({});
  useEffect(async function fetchData() {
    const responce =axios.get(`${baseURL}/plan/plan-operate/`);
    set
  }
  fetchData()
  ,[])
  return (
    <>
<div className="container">
  <div className="row">
    <Pricing />
  </div>
</div>
    </>
  );
};

export default Plans;
