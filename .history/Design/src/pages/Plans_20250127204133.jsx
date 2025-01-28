import { useEffect, useState } from "react";
import Pricing from "../components/card/pricing";

const Plans = () => {
  const [Plans,setPlans]= useState({});
  useEffect(async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
  }
  fetchData(),[])
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
