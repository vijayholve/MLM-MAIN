
function Pricing({}) {

  return (
    <div className="api-box border">
        <div className="name">Name: Vijay</div>
        <div className="plan-type">Plan Type: Recurring</div>
        <div className="price">Price: $2343</div>
    </div>

  );
}

Pricing.propTypes = {
  classNamees: PropTypes.object.isRequired,
};

export default Pricing;