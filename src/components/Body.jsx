import { Outlet, ScrollRestoration } from 'react-router-dom';

import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

function Body() {
  return (
    <NavBar>
      <ScrollRestoration />
      <div className="flex flex-1 justify-center">
        <Outlet />
      </div>
      <Footer />
    </NavBar>
  );
}

export default Body;
