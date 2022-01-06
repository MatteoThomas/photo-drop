import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8 } from "./imgIndex";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* width: 100%; */
`;

const Img = styled.img`
  min-height: 100%;
  height: auto;
  position: fixed;
  top: 0;
  margin: auto;
  ${mobile({ maxHeight: "100%" })}
`;

const Header = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: var(--script);
  font-size: clamp(5rem, 20vw, 12rem);
  color: rgb(240, 255, 255);
  letter-spacing: -0.5vw;
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  /* width: 1200px; */
  ${mobile({ width: "400px", letterSpacing: "-1.2vw" })}
`;

const Span = styled.h1`
  text-align: center;
  font-family: var(--thick);
  color: azure;
  font-size: clamp(1rem, 3vw, 3rem);
  letter-spacing: 0.3vw;
  margin-top: -2vh;
`;

const Home = () => {
  const album = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
  const randomIndex = Math.floor(Math.random() * album.length);
  const picture = album[randomIndex];

  var header = `Photo Drop!&nbsp;`;
  return (
    <Container>
      <Img src={picture} />
      <Header>
        Photo Drop!&nbsp;&nbsp;
        <Span>share, comment, inspire</Span>
      </Header>
    </Container>
  );
};

export default Home;
