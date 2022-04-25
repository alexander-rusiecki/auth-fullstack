import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
