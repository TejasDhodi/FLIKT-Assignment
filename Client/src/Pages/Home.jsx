import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Inputs from '../Components/Inputs';
import { userDataCredentials } from '../Service/data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const verifiedUser = useSelector(state => state.User.data.verifiedUser);
    const userName = verifiedUser && verifiedUser.userName;
    const [jwtToken, setJwtToken] = useState(JSON.parse(localStorage.getItem('jwtToken')));
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        city: '',
        district: '',
        state: '',
        postalCode: '',
        userName: ''
    });

    const [allData, setAllData] = useState([]);
    console.log('VerifiedUser Data: ', verifiedUser);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/add', inputs, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (response.status === 201) {
                toast.success('Added Successfully', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                getAllData();
            }
        } catch (error) {
            console.log('Unable to add data : ', error);
        }
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:3000/api/v1/delete/${id}`);

        if (response.status === 200) {
            toast.success('Deleted Successfully', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            getAllData();
        }
    }

    const navigateToUpdate = (id) => {
        navigate(`/update/${id}`)
    }

    const getAllData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/allData');

            if (response.status === 200) {
                setAllData(response.data.allData)
                console.log(response.data.allData);
            }
        } catch (error) {
            console.log('Unable to get all Data : ', error);
        }
    }

    useEffect(() => {
        getAllData();
    }, [])

    useEffect(() => {
        if (verifiedUser) {
            setInputs(prevInputs => ({
                ...prevInputs,
                userName: userName
            }))
        }
    }, [verifiedUser])

    // useEffect(() => {
    //     set
    // }, [])
    return (
        <div className='main'>
            <h1>Add Data To The Table</h1>
            <div className="centerDiv">
                {
                    jwtToken ? (
                        <>
                            <form onSubmit={handleSubmit}>
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
                                                handleSubmit={handleSubmit}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                                <div className="controls">
                                    <button type='submit'>Add</button>
                                </div>
                            </form>
                            <div className='tableData'>

                                <table border='1'>
                                    <thead>
                                        <tr>
                                            <th>City</th>
                                            <th>District</th>
                                            <th>State</th>
                                            <th>Postal Code</th>
                                            <th>Edit </th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allData.filter(item => item.userName === userName).map((currElem, index) => {
                                                const { city, district, postalCode, state, _id } = currElem;
                                                return (
                                                    <tr key={index}>
                                                        <td>{city}</td>
                                                        <td>{district}</td>
                                                        <td>{state}</td>
                                                        <td>{postalCode}</td>
                                                        <td className='controls' onClick={() => navigateToUpdate(_id)}>✒️</td>
                                                        <td className='controls' onClick={() => handleDelete(_id)}>🗑️</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                {
                                    allData.length === 0 && <h3>Your Table is Empty</h3>
                                }
                            </div>

                        </>
                    ) : (
                        <h1>Please Login to continue</h1>
                    )
                }
            </div>
        </div>
    )
}

export default Home;
