import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import OrderDetail from "./pages/OrderDetail";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { storeUser } from "./redux/reducer/userSlice";
import Cookies from 'js-cookie';

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));


function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = Cookies.get('user');

    if (token && userCookie) {
      try {
        const user = JSON.parse(userCookie);
        dispatch(storeUser({ user, token }));
      } catch (error) {
        console.error('Error parsing user from cookies:', error);
      }
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Logged In Route */}
          <Route element={<ProtectedRoute isAuthenticated={user ? false : true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Logged In User Routes */}
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetail />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>

  );
}

export default App;
