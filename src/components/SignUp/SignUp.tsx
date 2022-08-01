import React, { useState } from "react";
import { emailValid } from "../../helper/emailValid";
import { mobileValid } from "../../helper/mobileValid";
import { Users } from "../../data/Users";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", error: false });
  const [mobile, setMobile] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const [rePassword, setRePassword] = useState({ error: false });
  const [userExists, setUserExists] = useState({ exists: false, message: "" });

  const signupHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userData = {
      email: email.value,
      mobile: mobile.value,
      password: password.value,
    };
    const newUser = new Users();
    const allUsers = newUser.getLocalUsers();
    if (Array.isArray(allUsers)) {
      const userExists = allUsers.filter((user) => user.email === email.value);
      if (userExists && userExists.length) {
        setUserExists({
          exists: true,
          message: "User already exists, please Login",
        });
      } else {
        newUser.create(userData);
        navigate("/login");
        // Show a loading screen and a message that the use is being navigated
        // Redirect to Login
      }
    }
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailReceived = e.target.value;

    if (emailReceived && emailReceived.length > 0) {
      if (emailValid(emailReceived)) {
        setEmail({ value: emailReceived, error: false });
      } else {
        setEmail({ value: "", error: true });
      }
    } else {
      setEmail({ value: "", error: true });
    }
  };

  const mobileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobileReceived = e.target.value;

    if (mobileReceived) {
      if (mobileValid(mobileReceived)) {
        setMobile({ value: mobileReceived, error: false });
      } else {
        setMobile({ value: "", error: true });
      }
    } else {
      setMobile({ value: "", error: true });
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordReceived = e.target.value;
    if (passwordReceived) {
      if (passwordReceived.length >= 8) {
        setPassword({ value: passwordReceived, error: false });
      } else {
        setPassword({ value: "", error: true });
      }
    } else {
      setPassword({ value: "", error: true });
    }
  };

  const rePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rePasswordReceived = e.target.value;
    if (
      rePasswordReceived &&
      rePasswordReceived.length > 0 &&
      rePasswordReceived.match(password.value)
    ) {
      setRePassword({ error: false });
    } else {
      setRePassword({ error: true });
    }
  };

  return (
    <>
      {/* is-flex is-justify-content-space-between is-align-content-center */}
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-12-mobile is-10-desktop">
                <form className="box">
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className={`input ${
                          email.error ? "is-danger" : "is-success"
                        }`}
                        type="email"
                        placeholder="Enter your email"
                        onBlur={emailHandler}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    {email.error ? (
                      <label className="label is-danger">
                        <i className="fas fa-exclamation-circle"></i> Please enter a
                        valid email ID.
                      </label>
                    ) : null}
                  </div>

                  <div className="field">
                    <label className="label">Mobile Number</label>
                    <div className="control">
                      <input
                        className={`input ${
                          mobile.error ? "is-danger" : "is-success"
                        }`}
                        type="tel"
                        placeholder="Enter a mobile number"
                        onBlur={mobileHandler}
                      />
                    </div>
                    {mobile.error ? (
                      <label className="label">
                        <i className="fas fa-exclamation-circle"></i> Please enter a
                        valid indian mobile number (Don't use prefixes Ex: +91, 0)
                      </label>
                    ) : null}
                  </div>

                  <div className="field has-icons-left">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className={`input ${
                          password.error ? "is-danger" : "is-success"
                        }`}
                        type="password"
                        placeholder="Create a new password"
                        onBlur={passwordHandler}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    {password.error ? (
                      <label className="label">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        <span className="is-danger">
                          Password should be minimun 8 digits.
                        </span>
                      </label>
                    ) : null}
                  </div>

                  <div className="field">
                    <label className="label">Retype-Password</label>
                    <div className="control has-icons-left">
                      <input
                        className={`input ${
                          rePassword.error ? "is-danger" : "is-success"
                        }`}
                        type="password"
                        placeholder="Retype the password"
                        onBlur={rePasswordHandler}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    {rePassword.error ? (
                      <label className="label">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        <span className="is-danger">
                          Password not matching with the above typed password
                        </span>
                      </label>
                    ) : null}
                  </div>
                  <div className="is-flex is-justify-content-center">
                    <button
                      className="button is-primary is-fullwidth-mobile"
                      onClick={signupHandler}
                      disabled={
                        email.error ||
                        password.error ||
                        rePassword.error ||
                        mobile.error
                      }
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {userExists.exists ? (
              <div className="box">{userExists.message}</div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
