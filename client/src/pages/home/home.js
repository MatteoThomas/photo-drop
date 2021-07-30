import React from "react";
import "./styles.css";
import pic1 from "./crowd.jpg";
import pic2 from "./field.jpg";
import pic3 from "./donkey.jpg";
import pic4 from "./street.jpg";

const Home = () => {
  //   const album = [pic1, pic2, pic3, pic4];
  //   const contain = document.getElementById("frame");

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
        <img src={pic4} />
      </div>
    </div>
    // <div id="main">
    //   <div class="row text-center" id="main-row">
    //     <img
    //       src="https://images.unsplash.com/photo-1471584363844-b3909b58d6f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3648&q=80"
    //       class="img-fluid"
    //       id="random-pic"
    //       alt="..."
    //     ></img>

    //     <div class="jumbotron">
    //       <h1 class="display-4" id="main-header">
    //         Photo Drop!{" "}
    //       </h1>
    //       <p class="lead" id="intro">
    //         Sign In in order to Search and Upload imanges
    //       </p>
    //       <p class="lead" id="intro-sub">
    //         <a class="btn btn-primary btn-lg" href="#" role="button">
    //           Maybe this can be another login button or maybe
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
