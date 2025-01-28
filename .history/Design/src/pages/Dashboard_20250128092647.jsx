import React, { useCallback, useContext, useEffect, useState } from "react";
import DashBox from "../components/dashboard/DashBox";
import axios from "axios";
import { UserContext } from "../app";
const DashboardComponent = () => {
  const { baseURL } = useContext(UserContext);
  const [ Dashboard, setDashboard ] = useState({
    total_user: 0,
    active_user: 0,
    kyc_request: 0,
    pending_kyc:0,
    aproved_user:0
  });
  useEffect(() => {
    const fetchData = async () =>{
    const responce =await axios.get(`${baseURL}/api/dashboard/`);
    setDashboard({
      total_user: responce.data.total_user,
      active_user: responce.data.active_user,
      kyc_request: responce.data.kyc_request,
      pending_kyc:responce.data.pending_kyc,
      aproved_user:responce.data.aproved_user
    });
  }
  fetchData();
}, []);
console.log(Dashboard)
return (
    <>
      <div className="container-fluid">
        <div className="row mb-4">
          <DashBox className="col-md-6" title={"Total User"} total_number={Dashboard.total_user} />
          <DashBox className="col-md-6"  title={"ACtive user "} total_number={Dashboard.active_user} />
          <DashBox className="col-md-6"  title={"No of Kyc"} total_number={Dashboard.kyc_request} />
        <DashBox className="col-md-6"  title={"Pending kyc "} total_number={Dashboard.pending_kyc}/>  
       
        </div>
        <div className="row mb-4">
          <DashBox className="col-md-6"  title={"aproved User "} total_number={Dashboard.aproved_user}/>
          <DashBox className="col-md-6"  title={" User "} total_number={Dashboard.aproved_user}/>

        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
