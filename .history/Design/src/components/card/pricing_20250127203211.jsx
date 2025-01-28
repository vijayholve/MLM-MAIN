
function Pricing({name,plan_type,price}) {
  
  return (
    <div class="api-box border">
    <div class="name">Name: </div>
    <div class="plan-type">Plan Type: Recurring</div>
    <div class="price">Price: $2343</div>
    <button class="btn btn-primary">Purchase Plan</button>
</div>

  );
}

Pricing.propTypes = {
  classNamees: PropTypes.object.isRequired,
};

export default Pricing;