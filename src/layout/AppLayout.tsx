import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
