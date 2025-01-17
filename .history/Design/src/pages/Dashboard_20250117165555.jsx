import React from 'react'
import DashBox from '../components/dashboard/DashBox'

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <DashBox title={"Tot"} total_number={30}/>
            <DashBox title={"Vijay"} total_number={30}/>
            <DashBox title={"Vijay"} total_number={30}/>
            <DashBox title={"Vijay"} total_number={30}/>

        </div>
      </div>
    </>
  )
}

export default Dashboard
