import React, { useState } from 'react';
import { UserDoc } from '../../data/Interfaces/User';
import { User } from '../../data/User';
import { emailValid } from '../../helper/emailValid';
import { useNavigate } from "react-router-dom"

const Login = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState({ value: "", error: true });
    const [password, setPassword] = useState({ value: "", error: true });
    const [userExists, setUserExists] = useState({ exists: true , message: "" })

    const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const USERS = new User();
      const allUsers: UserDoc[] = USERS.getLocalUsers();
      if (Array.isArray(allUsers)) {
        const userExists = allUsers.filter(user => user.email === email.value && user.password === password.value);
        if (userExists && userExists.length) {
          USERS.setLoggedInUser({ userId: userExists[0].userId });
          // Redirect to Dashboard
          navigate(`/dashboard/${userExists[0].userId}`)
        } else {
          setUserExists({ exists: false, message: "Please check the credentials again" })
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
        setEmail({ value: "", error: true })
      }
    };

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordReceived = e.target.value;
      if (passwordReceived) {
        if ( passwordReceived.length >=8 ) {
          setPassword({ value: passwordReceived, error: false });
        } else {
          setPassword({ value: "", error: true  })
        }
      } else {
        setPassword({ value: "", error: true })
      }
    }

    return (
        <div className="box" style={{ height: "100vh", width: "100%" }}>
            <form className="box">
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${email.error ? "is-danger" : "is-success"}`}
                  type="email"
                  placeholder="Enter your email"
                  onBlur={emailHandler}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              {/* {email.error ? (
                  <label className="label is-danger">
                    <i className="fas fa-exclamation-circle"></i> Please enter a valid email
                    ID.
                  </label>
              ) : null} */}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${password.error ? "is-danger" : "is-success"}`}
                  type="password"
                  placeholder="Enter your password"
                  onBlur={passwordHandler}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              {/* {password.error ? (
                  <label className="label is-danger">
                    <i className="fas fa-exclamation-circle"></i> Please enter a valid email
                    ID.
                  </label>
              ) : null} */}
            </div>

            <button className="button is-primary" disabled={email.error || password.error} onClick={loginHandler}>Log in</button>
            </form>
            {
            !userExists.exists
            ? <div className="box">{userExists.message}</div>
            : null
          }
        </div>
    )
};

export default Login;