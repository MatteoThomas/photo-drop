import React from "react";
import "./resultStyles.css";
// import pic1 from "../pages/searchimage/img1.jpg";
// import pic2 from "../pages/searchimage/img2.jpg";
// import pic3 from "../pages/searchimage/img3.jpg";
// import pic4 from "../pages/searchimage/img4.jpg";
// import pic5 from "../pages/searchimage/img5.jpg";
// import pic6 from "../pages/searchimage/img6.jpg";
// import pic7 from "../pages/searchimage/img7.jpg";

function Results() {
  return (
    <div className="container">
      <h1>Photo Search</h1>
      <div className="searchContainer">
        <input className="search" type="text" placeholder="Search.."></input>
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div>

      <div className="results">
        <div className="text">Results</div>
        {/* <div className="picContainer">
          <img src={pic1} />
          <img src={pic2} />
          <img src={pic3} />
          <img src={pic4} />
          <img src={pic5} />
          <img src={pic6} />
          <img src={pic7} />
        </div> */}
      </div>
    </div>
  );
}

export default Results;
