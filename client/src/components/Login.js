import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginSchema from '../schemas/loginSchema';
import spinner from '../spinner.svg';

const Login = () => {
  const LOGIN_URL = 'http://localhost:4000/auth/login';
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = evt => {
    const name = evt.target.name;
    setUser({ ...user, [name]: evt.target.value });
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    await loginSchema
      .validate(user, { abortEarly: false })
      .then(() => {
        setErrorMessage('');
        const registeredUser = {
          username: user.username,
          password: user.password,
        };
        setIsLoggingIn(true);
        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registeredUser),
        })
          .then(response => {
            if (response.ok) {
              navigate('/dashboard');
              return response.json();
            }
            return response.json().then(error => {
              throw new Error(error.message);
            });
          })
          .then(result => {
            console.log(result);
            setIsLoggingIn(false);
            navigate('/dashboard');
          })
          .catch(err => {
            setIsLoggingIn(false);
            setErrorMessage(err.message);
          });
        formRef.current.reset();
      })
      .catch(err => {
        if (err) {
          setErrorMessage(err.inner[0].errors);
          return;
        }
      });
  };

  return (
    <>
      <h2 className="text-center mt-5">Login</h2>
      {isLoggingIn && (
        <div className="text-center">
          <img src={spinner} alt="loading spinner" />
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-dismissible alert-danger">
          {errorMessage}
        </div>
      )}
      {!isLoggingIn && (
        <form
          className="w-25 mt-5 mx-auto"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <fieldset>
            <div className="form-group mt-5">
              <label htmlFor="username" className="form-label mt-4">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="username"
                aria-describedby="usernamelHelp"
                placeholder="enter username"
                required
                onChange={handleChange}
              />
              <small className="text-white">Enter your username to login</small>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label mt-4">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                aria-describedby="passwordlHelp"
                placeholder="enter password"
                required
                onChange={handleChange}
              />
              <small className="text-white">Enter your password to login</small>
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Login
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default Login;
