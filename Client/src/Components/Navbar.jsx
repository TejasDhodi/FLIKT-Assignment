import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const verifiedUser = useSelector(state => state.User.data.verifiedUser);
    const userName = verifiedUser && verifiedUser.userName;

    const handleLogout = () => {

        toast.success('Logged Out Successfully', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };


    return (
        <nav>
            <div className="navBrand">
                <h3>FLIKT Technology</h3>
            </div>
            <ul className="navItems">
                {
                    jwtToken ?
                        <>
                            <li className="navList" onClick={handleLogout}>Logout</li>
                            <li className='navList'>{userName}</li>
                        </>
                        :
                        <>
                            <NavLink className="navList" to='/login'>Login</NavLink>
                            <NavLink className="navList" to='/register'>Register</NavLink>
                        </>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
