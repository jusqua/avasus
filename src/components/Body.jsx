import Breadcrumbs from '@components/Breadcrumbs';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

function Body({ children }) {
  return (
    <NavBar>
      <div className="flex flex-1 justify-center">
        <main className="w-full lg:w-[1024px] p-4 flex flex-col">
          {children}
        </main>
      </div>
      <Footer />
    </NavBar>
  );
}

export default Body;
