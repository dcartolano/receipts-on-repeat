import React, { useState, useEffect } from 'react';

const LoginPage = () => {
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        // Redirect to the Spotify login route on the server
        window.location.href = '/spotify/login'; // Adjust based on your server's URL
    };

    // Fetch user data after successful login
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('/spotify/callback'); // Adjust based on your server's URL
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };

        // Call fetchUserData if user is not null
        if (user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <main>
            <div className='homePage-main-box'>
                <h1 className='homePage-header-text'>Receipts on Repeat</h1>
                <button onClick={handleLogin} className='login-button'>Login with Spotify</button>
                {user ?
                    <div>
                        <h2>Welcome, {user.name}!</h2>
                        <p>Email: {user.email}</p>
                        {user.image && <img src={user.image} alt="Profile" />}
                    </div> : <p className='please-sign-in'>please sign in!</p>}
            </div>
        </main>
    );
};

export default LoginPage;