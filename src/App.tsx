import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import apiRoot from "./Service/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <></> },
      { path: "", element: <></> },
    ],
  },
]);

function App() {
  console.log(apiRoot);
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
