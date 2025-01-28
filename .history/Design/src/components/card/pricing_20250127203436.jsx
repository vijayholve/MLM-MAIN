import '..Pricing.css'
function Pricing({name,plan_type,price}) {
  
  return (
    <div className="api-box border">
    <div className="name">Name: {name}</div>
    <div className="plan-type">Plan Type: {plan_type}</div>
    <div className="price">Price: ${price}</div>
    <button className="btn btn-primary">Purchase Plan</button>
</div>

  );
}
export default Pricing;