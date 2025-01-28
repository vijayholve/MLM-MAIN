
function Pricing({name,plan_type,price}) {
  
  return (
    <div clas="api-box border">
    <div clas="name">Name: {name}</div>
    <div clas="plan-type">Plan Type: {plan_type}</div>
    <div clas="price">Price: ${price}</div>
    <button clas="btn btn-primary">Purchase Plan</button>
</div>

  );
}

Pricing.propTypes = {
  clasNamees: PropTypes.object.isRequired,
};

export default Pricing;