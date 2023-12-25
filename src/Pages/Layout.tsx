import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
