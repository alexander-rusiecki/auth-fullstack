import { useState } from 'react';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const validUser = () => {
    if (newUser.password === newUser.confirmPassword) {
      setErrorMessage('');
      return true;
    } else {
      setErrorMessage('Passwords must match');
      return false;
    }
  };
  const handleChange = evt => {
    const name = evt.target.name;
    setNewUser({ ...newUser, [name]: evt.target.value });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (validUser()) {
      console.log(newUser);
    }
  };
  return (
    <>
      <h2 className="text-center mt-5">Sign up</h2>
      {errorMessage && (
        <div className="alert alert-dismissible alert-danger">
          {errorMessage}
        </div>
      )}
      <form className="w-25 mt-5 mx-auto" onSubmit={handleSubmit}>
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
              placeholder="Enter username"
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
              placeholder="Enter password"
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
              placeholder="Confirm password"
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-5">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Signup;
