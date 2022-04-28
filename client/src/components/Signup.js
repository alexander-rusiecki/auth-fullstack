import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import signinSchema from '../schemas/signinSchema';
import spinner from '../spinner.svg';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = evt => {
    const name = evt.target.name;
    setNewUser({ ...newUser, [name]: evt.target.value });
  };
  const handleSubmit = async evt => {
    evt.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setErrorMessage('Passwords must match');
      return;
    }
    await signinSchema
      .validate(newUser, { abortEarly: false })
      .then(userInput => {
        setErrorMessage('');
        const registeredUser = {
          username: userInput.username,
          password: userInput.password,
        };
        setIsSigningUp(true);
        fetch('http://localhost:4000/auth/signup', {
          method: 'POST',
          body: JSON.stringify(registeredUser),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              navigate('/login');

              return response.json();
            }
            return response
              .json()
              .then(error => {
                throw new Error(error.message);
              })
              .then(user => {
                setIsSigningUp(false);
                navigate('/login');
              });
          })
          .catch(err => {
            setIsSigningUp(false);
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
      <h2 className="text-center mt-5">Sign up</h2>
      {isSigningUp && (
        <div className="text-center">
          <img src={spinner} alt="loading spinner" />
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-dismissible alert-danger">
          {errorMessage}
        </div>
      )}
      {!isSigningUp && (
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
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label mt-4">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="confirmPassword"
                aria-describedby="confirmPasswordlHelp"
                placeholder="confirm password"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default Signup;
