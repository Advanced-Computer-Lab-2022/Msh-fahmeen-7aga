const RatingFilter = (props) => {
  return (
    <>
      <div className="row">
        <div class="input-group">
          <span class="input-group-text">Filter By Rating</span>
          <input
            type="text"
            class="form-control"
            onChange={(e) => {
              props?.setRating(e.target.value);
              if (e.target.value === "") {
                props.setRating(null);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
export default RatingFilter;
