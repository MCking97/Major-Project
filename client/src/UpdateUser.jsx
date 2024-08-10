import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const { id } = useParams(); // Get the user ID from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        axios.get(`http://localhost:3001/users/${id}`)
            .then(response => {
                const user = response.data;
                setName(user.name);
                setEmail(user.email);
                setAge(user.age);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/users/${id}`, { name, email, age })
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor='name'>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor='age'>Age</label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
