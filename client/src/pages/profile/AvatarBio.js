import React, { Component } from "react";
import avatar1 from "./avatar1.png";

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';



const AvatarBio = () => {

  const { data } = useQuery(GET_ME);
  const userData = data?.me || [];

    return (
      <div id="bio">
        <div id="avatar">
          <img src={avatar1} alt="avatar" />
        </div>
        <div id="text">
          <h3>Bio</h3>
          <h3>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus. Temporibus autem
            quibusdam et aut officiis debitis aut rerum necessitatibus saepe
            eveniet ut et voluptates repudiandae sint et molestiae non
            recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut
            aut reiciendis voluptatibus maiores alias consequatur aut
            perferendis doloribus asperiores repellat.
          </h3>
        </div>
      </div>
    );
  }

export default AvatarBio;
