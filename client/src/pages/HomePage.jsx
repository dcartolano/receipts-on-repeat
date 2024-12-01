import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        // Redirect to the Spotify login route on the server
        window.location.href = 'http://localhost:3000/spotify/login'; // Adjust based on your server's URL
    };

    // Fetch user data after successful login
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:3000/callback'); // Adjust based on your server's URL
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
            <h1>Receipts on Repeat</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
            {user && (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    {user.image && <img src={user.image} alt="Profile" />}
                </div>
            )}
        </main>
    );
};

export default HomePage;