import React from "react";
import { Link } from "react-router-dom";



const Footer = () => (
    <div className="footer">
        <p>Help make this page better!</p>
       <button><Link to={"/Payment"}>Donate Now!</Link></button>
    </div>
);

export default Footer;