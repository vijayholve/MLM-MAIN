
function Pricing({name,plan_type,price}) {
  
  return (
    <div class="api-box border">
    <div class="name">Name: {name}</div>
    <div class="plan-type">Plan Type: {plan_type}</div>
    <div class="price">Price: ${}</div>
    <button class="btn btn-primary">Purchase Plan</button>
</div>

  );
}

Pricing.propTypes = {
  classNamees: PropTypes.object.isRequired,
};

export default Pricing;