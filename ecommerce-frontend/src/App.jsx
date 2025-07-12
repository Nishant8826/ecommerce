import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import OrderDetail from "./pages/OrderDetail";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));


function App() {

  const user = useSelector((state) => state.user.user)

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Logged In Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Logged In User Routes */}
          {/* <Routes> */}
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          {/* </Routes> */}
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
