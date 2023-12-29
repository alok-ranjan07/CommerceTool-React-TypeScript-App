import { NavLink } from "react-router-dom";
import classes from "../CSS/MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/discount"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Discount
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/store"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Store
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
