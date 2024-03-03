import React, { useState } from 'react'
import { loginCredentials } from '../Service/data'
import Inputs from '../Components/Inputs';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        errorMessage: ''
    });

    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value,
            errorMessage: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', inputs);
            const data = response.data;
            const token = data.token
            console.log();
            console.log('My Data token: ', token);
            console.log('My Data : ', data);
            if (response.status === 200) {
                toast.success('Login Successfull', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                localStorage.setItem('jwtToken', JSON.stringify(token))
                navigate('/')
                window.location.reload();
            }
        } catch (error) {
            setInputs({
                ...inputs,
                errorMessage: error.response.data.message
            })
            console.log('errorMseeee', error.response.data.message);
        }
        console.log(inputs);
    }


    return (
        <form className='login' onSubmit={handleSubmit}>
            <div className="errors">
                <p>{inputs.errorMessage}</p>
            </div>
            {
                loginCredentials.map((currElem, index) => {
                    const { name, type, id, heading } = currElem;
                    return (
                        <Inputs
                            name={name}
                            type={type}
                            id={id}
                            heading={heading}
                            key={index}
                            handleInputs={handleInputs}
                        />
                    )
                })
            }
            <div className="controls">
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Login
