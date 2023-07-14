import React from "react";
import Styles from "../../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  const handleSignIn = () => {
    console.log("check");
  };
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-end">
        <button className={`btn btn-primary ${Styles.btn}`}>
          Add Business
        </button>
        <div className={`ms-3 mt-1 cursor-pointer${Styles.signin}`}>
          <a href={"/login"}>
            {" "}
            <p>Sign In</p>
          </a>
        </div>
        <div className="mt-1 ms-3">|</div>

        <div className={`ms-3 mt-1 cursor-pointer${Styles.signin}`}>
          Sign up
        </div>
      </div>
    </div>
  );
};

export default Header;
