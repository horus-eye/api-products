import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductsTable from './ProductsTable';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const alertTimeout = useRef(null);

    useEffect(() => {
        return () => {
            // Clean up the timer on component unmount
            clearTimeout(alertTimeout.current);
        };
    }, []);

    const clearInputs = () => {
        setUsername('');
        setPassword('');
        setError('');
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/login', { username, password })
            .then((response) => {
                const { message, token } = response.data;
                console.log(message); // Token message
                /*                 console.log(token); // Token in state/local storage
                 */
                // Reset form fields
                clearInputs();
                setIsLoggedIn(true);
                setToken(token);
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.error);
                } else {
                    setError('Request error');
                }

                // Set timer to hide alert component after 2000ms
                alertTimeout.current = setTimeout(() => {
                    setError('');
                    clearInputs();
                }, 2000);
            });
    };

    if (isLoggedIn) {
        return <ProductsTable token={token} />;
    }

    return (
        <div className='container'>
            <div className='row d-flex justify-content-center mt-4'>
                <div className='col-12 col-sm-8 col-md-6 mx-auto justify-content-center'>
                    <h1 className='text-muted text-center'>Login</h1>
                    <form className='mt-4 mx-auto justify-content-center' onSubmit={handleSubmit}>
                        <div>
                            <label className='form-label text-muted mt-2' htmlFor="username">Username:</label>
                            <input
                                className='text-muted form-control mt-2'
                                autoComplete=''
                                maxLength={10}
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div>
                            <label className='form-label text-muted mt-2' htmlFor="password">Password:</label>
                            <input
                                className='text-muted form-control mt-2'
                                autoComplete=''
                                maxLength={10}
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div>
                            <button className='btn btn-primary mt-2' type="submit">Login</button>
                        </div>
                        {error && <div role="alert" className='alert alert-danger mt-3'>{error}</div>} {/* Show error message if it exists */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
