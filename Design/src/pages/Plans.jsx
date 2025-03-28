import { useContext, useEffect, useState } from "react";
import Pricing from "../components/card/pricing";
import axios from "axios";
import { UserContext } from "../app";

const Plans = () => {
  const { baseURL } = useContext(UserContext);
  const [Plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/plan/plan-operate/`);
        setPlans(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchData(); // Call the async function
  }, [baseURL]);

  return (
    <>
      <div className="container">
        <div className="row">

        {Plans.map((plan) => (
          <Pricing key={plan.id} name={plan.name} 
          plan_type={plan.plan_type} price={plan.price} />
        ))}
        </div>
      </div>
    </>
  );
};

export default Plans;
