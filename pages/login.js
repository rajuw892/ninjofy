import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Styles from "../styles/Login.module.css";
import axios from "axios";
import { useState } from "react";
import { Label } from "reactstrap";
import { Input } from "reactstrap";
import { BiLogoGmail } from "react-icons/bi";

const Login = () => {
  const [data, setData] = useState("");
  const handleSignIn = () => {
    axios
      .get("/api/auth/google")
      .then((req) => {
        setData(req.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row mx-auto">
      <div className="col-md-5 mx-auto ">
        <div className={`${Styles.login_card}`}>
          <h2 className="text-center">Sign Up</h2>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <button className={` ${Styles.btn_border}`}>
                  {" "}
                  <FaFacebook size={28} />
                </button>
              </div>

              <div className="col-md-6 mx-auto">
                <button className={` ${Styles.btn_border}`}>
                  {" "}
                  <FcGoogle size={28} />
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-5">
                <hr />
              </div>
              <div className="col-md-1">
                <p>OR</p>
              </div>
              <div className="col-md-5">
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Label>First Name </Label>
                <Input placeholder="First Name" />
              </div>
              <div className="col-md-6 mb-3">
                <Label>Last Name</Label>
                <Input placeholder="Last Name" />
              </div>

              <div className="col-md-12 mb-3">
                <Label>Email</Label>
                <Input placeholder="yourmail@.com" />
              </div>

              <div className="col-md-12 mb-3">
                <Label>Password</Label>
                <Input type="password" placeholder="Password" />
                {/* <BiLogoGmail className={`my-auto ${Styles.icon}`} /> */}
              </div>

              <div className="col-md-12 mb-3">
                <input type="checkbox" />
                <span className="ms-2"> I agree with terms and condition</span>
              </div>

              <div className="col-md-12 mb-3">
                <button className={`${Styles.btn_signup}`}>Sign Up</button>
              </div>
            </div>
            <div>
              <p className="text-center">
                Already have an account? <a href="#">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
