
function Pricing({name,plan_type,price}) {
  
  return (
    <div classna="api-box border">
    <div classna="name">Name: {name}</div>
    <div classna="plan-type">Plan Type: {plan_type}</div>
    <div classna="price">Price: ${price}</div>
    <button classna="btn btn-primary">Purchase Plan</button>
</div>

  );
}

Pricing.propTypes = {
  classnaNamees: PropTypes.object.isRequired,
};

export default Pricing;