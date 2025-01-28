
function Pricing({name,plan_type,price}) {
  
  return (
    <div className="api-box border">
        <div className="name">Name: {name}</div>
        <div className="plan-type">Plan Type: Recurring</div>
        <div className="price">Price: $2343</div>
    </div>

  );
}

Pricing.propTypes = {
  classNamees: PropTypes.object.isRequired,
};

export default Pricing;