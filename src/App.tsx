import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Discount from "./Pages/Discount-Module/Discount";
import CartDiscountList from "./Pages/Discount-Module/CartDiscountList";
import CartDiscountAdd from "./Pages/Discount-Module/CartDiscountAdd";
import StoreCustomerList from "./Pages/Store-Module/StoreCustomerList";
import StoreProductList from "./Pages/Store-Module/StoreProductList";
import Store from "./Pages/Store-Module/Store";
import StoreList from "./Pages/Store-Module/StoreList";
import StoreListAdd from "./Pages/Store-Module/StoreListAdd";
import DiscountCodeList from "./Pages/Discount-Module/DiscountCodeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discount", element: <Discount /> },
      { path: "/discount/cartDiscount", element: <CartDiscountList /> },
      { path: "/discount/cartDiscount/add", element: <CartDiscountAdd /> },
      {
        path: "/discount/cartDiscount/add/:cartDiscountId",
        element: <CartDiscountAdd />,
      },
      { path: "/discount/discountCode", element: <DiscountCodeList /> },
      { path: "/store", element: <Store /> },
      { path: "/store/storeList", element: <StoreList /> },
      { path: "/store/storeList/add", element: <StoreListAdd /> },
      { path: "/store/customer/:key", element: <StoreCustomerList /> },
      { path: "/store/product/:key", element: <StoreProductList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Alternate Method for create Routes
// function Appp(){
// return (
//   <>
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/create" element={<Add />} />
//           <Route path="/edit/:id" element={<Edit />} />
//         </Routes>
//       </Router>
//     </div>
//   </>);
// }
