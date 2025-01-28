
function Pricing({name,plan_type,price}) {
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

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