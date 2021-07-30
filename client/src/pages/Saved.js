import React from "react";
import "./resultStyles.css";
import pic1 from "../pages/savedImage/img11.jpg";
import pic2 from "../pages/savedImage/img12.jpg";
import pic3 from "../pages/savedImage/img13.jpg";
import pic4 from "../pages/savedImage/img14.jpg";
import pic5 from "../pages/savedImage/img15.jpg";
import pic6 from "../pages/savedImage/img16.jpg";
import pic7 from "../pages/savedImage/img17.jpg";
import pic8 from "../pages/savedImage/img18.jpg";
import pic9 from "../pages/savedImage/img19.jpg";

function Saved() {
  return (
    <div className="container">
      <div className="results">
        <div className="text">Results</div>
        <div className="picContainer">
          <img src={pic1} />
          <img src={pic2} />
          <img src={pic3} />
          <img src={pic4} />
          <img src={pic5} />
          <img src={pic6} />
          <img src={pic7} />
          <img src={pic8} />
          <img src={pic9} />
        </div>
      </div>
    </div>
  );
}

export default Saved;
