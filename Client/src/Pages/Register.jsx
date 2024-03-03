import React, { useState } from 'react'
import axios from 'axios'
import Inputs from '../Components/Inputs';
import { registerCredentials } from '../Service/data';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Register = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleInputs = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/register', inputs);
            const data = response.data;
            if (response.status === 201) {
              toast.success('Registration Successfull', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
        } catch (error) {
            alert("Unable To Register");
            console.log(`error : ${error}`);
        }
        console.log(inputs);
    }

  return (
    <form className='register' onSubmit={handleSubmit}> 
      {
        registerCredentials.map((currElem, index) => {
            const {name, type, id, heading} = currElem;
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
        <button type='submit'>Register</button>
      </div>
    </form>
  )
}

export default Register
