import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light h-10">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Auth
        </Link>
      </div>
    </nav>
  );
};

export default Header;
