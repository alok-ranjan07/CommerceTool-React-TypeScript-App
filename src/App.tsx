import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Discount from "./Pages/Discount";
import CartDiscountList from "./Pages/CartDiscountList";
import CartDiscountAdd from "./Pages/CartDiscountAdd";

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
