import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { clearUser } from "../redux/reducer/userSlice";
import toast from "react-hot-toast";

const Header = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const logoutHandler = () => {
        setIsOpen(false);
        dispatch(clearUser());
        toast.success('Signed out Successfully')
    }

    return (
        <nav className="header">
            <Link to={'/'}>HOME</Link>
            <Link to={'/search'}><FaSearch /></Link>
            <Link to={'/cart'}><FaShoppingBag /></Link>

            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {/* {user.role == 'admin' && <Link to={'/admin/dashboard'}>Admin</Link>} */}
                            {/* <Link to={'/orders'}>Orders</Link> */}
                            <button onClick={logoutHandler}><FaSignOutAlt /></button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link to={"/login"}><FaSignInAlt /></Link >
            )
            }
        </nav >
    )
}

export default Header