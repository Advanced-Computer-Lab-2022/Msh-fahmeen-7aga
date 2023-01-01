const PriceFilter = (props) => {
  return (
    <>
      <div className="row">
        <div class="input-group">
          <span class="input-group-text">Price Min, Max</span>
          <input
            type="text"
            aria-label="priceMin"
            class="form-control"
            onChange={(e) => {
              props?.setMin(e.target.value);
              if (e.target.value === "") {
                props.setMin(null);
              }
            }}
          />
          <input
            type="text"
            aria-label="priceMax"
            class="form-control"
            onChange={(e) => {
              props?.setMax(e.target.value);
              if (e.target.value === "") {
                props.setMax(null);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
export default PriceFilter;
