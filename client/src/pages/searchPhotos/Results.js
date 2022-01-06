import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  background-color: aliceblue;
`;

const SearchContainer = styled.div``;
const ResultsContainer = styled.div``;

function Results() {
  return (
    <Container>
      <Header>Photo Search</Header>

      <SearchContainer>
        <input className="search" type="text" placeholder="Search.."></input>
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </SearchContainer>

      <ResultsContainer>
        <div className="text">Results</div>
      </ResultsContainer>
    </Container>
  );
}

export default Results;
