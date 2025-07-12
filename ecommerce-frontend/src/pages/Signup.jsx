import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { addUserViaGoogle, checkEmailExist, newUser } from '../services/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { storeUser } from '../redux/reducer/userSlice';
import { auth } from '../config/firebase';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        gender: "male",
        dob: "",
        role: "user"
    })
    const [emailExist, setEmailExist] = useState(false);
    const changeHandler = async (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }
    const SignupHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await newUser(userInfo);
            const result = response.data;
            if (result.success) {
                dispatch(storeUser(result));
                navigate('/')
                toast.success('Signed in successfully');
            } else {
                toast.error(result.msg)
            }
        } catch (error) {
            console.log("Error");
            toast(`Error occured`);
        }
    }
    const googleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider)
            const googleObj = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                gender: userInfo.gender ? userInfo.gender : '',
                role: userInfo.role,
                dob: userInfo.dob ? userInfo.dob : '',
                _id: user.uid,
            }
            const response = await addUserViaGoogle(googleObj);
            const result = response.data;
            if (result.success) {
                dispatch(storeUser(result));
                navigate('/')
                toast.success('Signed in successfully');
            } else {
                toast.error(result.msg)
            }
        } catch (error) {
            console.log('Error occured', error);
            toast.error(error?.message ? error.message : 'Server Error');
        }

    }
    const emailHandler = async () => {
        try {
            const response = await checkEmailExist({ email: userInfo.email });
            setEmailExist(response.data);
        } catch (error) {
            console.log('Email check error', error);
        }
    }
    return (
        <div className='signup'>
            <main>
                <form>
                    <h1>Signup</h1>
                    <input type="text" placeholder="Name" name="name" value={userInfo.name} required onChange={changeHandler} />
                    <input type="email" placeholder="Email" name="email" value={userInfo.email} required onBlur={emailHandler} onChange={changeHandler} />
                    {emailExist?.msg && <span className="error red">{emailExist?.msg}</span>}
                    <input type="password" placeholder="Password" name="password" value={userInfo.password} required onChange={changeHandler} />
                    <input type="date" placeholder="DOB" name="dob" value={userInfo.dob} required onChange={changeHandler} />
                    <select value={userInfo.gender} onChange={changeHandler}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button type="submit" onClick={SignupHandler}>Signup</button>
                    <p>Already have an account? <Link to={'/login'}>Login here.</Link></p>
                </form>
                <div className='br'></div>
                <button className='google-btn' onClick={googleSignup}>
                    <FcGoogle></FcGoogle> Sign up with Google
                </button>

            </main>
        </div>
    )
}

export default Signup