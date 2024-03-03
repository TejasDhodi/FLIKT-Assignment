import React, { useEffect, useState } from 'react'
import { userDataCredentials } from '../Service/data';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Inputs from '../Components/Inputs';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateData = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [inputs, setInputs] = useState({
        city: '',
        district: '',
        state: '',
        postalCode: '',
        userName: ''
    });


    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/update/${id}`, inputs, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if(response.status === 200) {
                toast.success('Updated Successfully', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                navigate('/')
            }
        } catch (error) {
            console.log('Unable to Update data : ', error);
        }
    }

    const getSingleUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/singleData/${id}`);
            const data = response.data.singleUserData;
            console.log('singlee : ', data);

            // Set user data to state
            setInputs({
                userName: data.userName,
                city: data.city,
                district: data.district,
                state: data.state,
                postalCode: data.postalCode
            });

        } catch (error) {
            console.log('Unable to find data : ', error);
        }
    }



    useEffect(() => {
        getSingleUserData();
    }, [])

    
    return (
        <div>
            <form className='update' onSubmit={handleUpdate}>
                <div className="inputs">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" id="userName" value={inputs.userName} onChange={handleInputs} readOnly />
                </div>
                {
                    userDataCredentials.map((currElem, index) => {
                        const { name, type, heading, id } = currElem;
                        return (
                            <Inputs
                                name={name}
                                type={type}
                                heading={heading}
                                value={inputs[name]}
                                id={id}
                                handleInputs={handleInputs}
                                handleSubmit={handleUpdate}
                                key={index}
                            />
                        )
                    })
                }
                <div className="controls">
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateData
