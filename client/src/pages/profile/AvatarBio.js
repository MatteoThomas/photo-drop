import React, { Component } from "react";
import avatar1 from "./avatar2.png";
class AvatarBio extends Component {
  render() {
    return (
      <div id="bio">
        <div id="avatar">
          <img src={avatar1} alt="avatar" />
        </div>
        <div id="text">
          <h3>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus.
          </h3>
        </div>
      </div>
    );
  }
}

export default AvatarBio;
