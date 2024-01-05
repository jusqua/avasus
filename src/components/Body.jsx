import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

function Body() {
  return (
    <NavBar>
      <div className="flex flex-1 justify-center">
        <main className="w-full lg:w-[1024px] p-4 flex flex-col">
          <Outlet />
        </main>
      </div>
      <Footer />
    </NavBar>
  );
}

export default Body;
