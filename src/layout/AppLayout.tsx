import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
