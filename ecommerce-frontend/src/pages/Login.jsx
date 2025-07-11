import React, { useState } from 'react'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const changeHandler = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    return (
        <div className='login'>
            <main>
                <form>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" name="email" value={user.email} required onChange={changeHandler} />
                    <input type="password" placeholder="Password" name="password" value={user.password} required onChange={changeHandler} />
                    <button type="submit">Login</button>
                </form>
                <div className='br'></div>
                <div className='google-btn'>
                    <button >
                        <FcGoogle />
                    </button>

                    <button >
                        <FaFacebook />
                    </button>

                    <button >
                        <FaGithub />
                    </button>
                </div>

            </main>
        </div>
    )
}

export default Login