import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useDispatch } from 'react-redux';
import { storeUser } from '../redux/reducer/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const changeHandler = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await login(user);
            const result = response?.data;
            if (result) {
                dispatch(storeUser(result.result?.user));
                toast(result.msg);
                navigate('/')
            }
        } catch (error) {
            console.log('Error :', error);
            toast(error.message);
        }
    }

    return (
        <div className='login'>
            <main>
                <form>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" name="email" value={user.email} required onChange={changeHandler} />
                    <input type="password" placeholder="Password" name="password" value={user.password} required onChange={changeHandler} />
                    <button type="submit" onClick={loginHandler}>Login</button>
                    <p>Don't have an account? <Link to={'/signup'}>Register here.</Link></p>
                </form>
            </main>
        </div>
    )
}

export default Login