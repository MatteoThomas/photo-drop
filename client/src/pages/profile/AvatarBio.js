import React from "react";
import avatar1 from "./avatar2.png";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  margin-top: 1rem;
  width: 50%;
  ${mobile({ width: "95%" })}
`;

const Text = styled.div`
  margin-top: 1rem;
`;

const AvatarBio = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || [];

  return (
    <Container>
      <div id="avatar">
        <img src={avatar1} alt="avatar" />
      </div>
      <Text>
        <h3>
          I'm an OK photographer with a lot of passion. See my work and let me
          know what you think, OK?
        </h3>
      </Text>
    </Container>
  );
};

export default AvatarBio;
