import React from "react";
import "./styles.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import "./styles.css";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  margin: 0 auto;
  font-family: var(--thin);
  font-size: clamp(4rem, 6vw, 8rem);
  text-align: center;
  color: rgb(240, 255, 255);
  letter-spacing: 0vw;
  line-height: 6vw;
  ${mobile({ lineHeight: "15vw" })}
`;

const Header = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || [];

  return (
    <Container>
      <HeaderWrapper>
        {userData.username}'s <br />
        Profile
        <div id="userlog"></div>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
