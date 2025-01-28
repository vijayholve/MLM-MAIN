import { useContext, useEffect, useState } from "react";
import Pricing from "../components/card/pricing";
import axios from "axios";
import { UserContext } from "../app";

const Plans = () => {
  const {baseURL} =useContext(UserContext)
  const [Plans,setPlans]= useState({});
  useEffect( function fetchData() {
    const responce =  axios.get(`${baseURL}/plan/plan-operate/`);
    setPlans(responce.data)
  }
  fetchData()   
  ,[])
  
  return (
    <>
<div className="container">
    <Pricing />
</div>
    </>
  );
};

export default Plans;
