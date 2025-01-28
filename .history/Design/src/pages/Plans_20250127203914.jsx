import { useEffect, useState } from "react";
import Pricing from "../components/card/pricing";

const Plans = () => {
  const [Plans,setPlans]= useState({})
  useEffect(function (){
    
  },[])
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
