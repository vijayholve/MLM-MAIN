import { useEffect, useState } from "react";
import Pricing from "../components/card/pricing";
import axios from "axios";

const Plans = () => {
  const {}
  const [Plans,setPlans]= useState({});
  useEffect(async function fetchData() {
    axios.get()
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
