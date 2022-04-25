import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-5">
      <h1>Authentication</h1>
      <Link to="/signup">
        <button type="button" className="btn btn-secondary m-5">
          Sign up
        </button>
      </Link>
    </div>
  );
};

export default Home;
