import React from "react";
import avatar1 from "./avatar2.png";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";

const AvatarBio = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || [];

  return (
    <div id="bio">
      <div id="avatar">
        <img src={avatar1} alt="avatar" />
      </div>
      <div id="text">
        <h2>Bio</h2>
        <h3>
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus, omnis
          voluptas assumenda est, omnis dolor repellendus.
        </h3>
      </div>
    </div>
  );
};

export default AvatarBio;
