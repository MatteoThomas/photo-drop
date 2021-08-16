import React from "react";
import "./styles.css";
import pic1 from "./crowd.jpg";
import pic2 from "./field.jpg";
import pic3 from "./donkey.jpg";
import pic4 from "./street.jpg";
import pic5 from "./apartment.jpg";
import pic6 from "./temple.jpg";

import pic8 from "./graves.jpg";
import pic9 from "./trainplatform.jpg";

const Home = () => {
  const album = [pic1, pic2, pic3, pic4, pic5, pic6, pic8, pic9];
  const randomIndex = Math.floor(Math.random() * album.length);
  const picture = album[randomIndex];

  // const contain = document.getElementById("frame");

  // function getRandomImage() {
  //   var num = Math.floor(Math.random() * album.length);
  //   var img = album[num];
  //   contain.innerHTML = '<img src="' + img + '">';
  // }
  // getRandomImage();

  return (
    <div className="container">
      <div className="header">
        Photo Drop!
        <span>share, comment, inspire</span>
      </div>
      <div id="frame">
        <img src={picture} />
      </div>
    </div>
  );
};

export default Home;
