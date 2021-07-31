import React from "react";
import "./styles.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import "./styles.css";

const Header = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || [];

  return (
    <>
      <div>
        <div className="header">
          <h1>{userData.username}'s Gallery</h1>
          <div id="userlog"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
