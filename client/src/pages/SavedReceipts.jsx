import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Receipt from "../components/Receipt/index.jsx";

// Define your GraphQL query
const GET_PLAYLIST_RECEIPT = gql`
    query GetPlaylistReceipt($id: ID!) {
        playlist(id: $id) {
            
        }
        user {
            
        }
    }
`;

const SavedPlaylistReceipts = () => {
    const [playlistId, setPlaylistId] = useState(null);
    
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        // Retrieve the selected playlist ID from local storage
        const selectedPlaylist = JSON.parse(localStorage.getItem('selectedPlaylist'));
        if (selectedPlaylist) {
            setPlaylistId(selectedPlaylist.id); // Assuming selectedPlaylist has an id property
        }
    }, []);

    // Use the useQuery hook to fetch data from the GraphQL API
    const { loading, error, data } = useQuery(GET_PLAYLIST_RECEIPT, {
        variables: { id: playlistId },
        skip: !playlistId, // Skip the query if playlistId is not set
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Receipt playlist={data.playlist} userData={userData} /> {/* Pass the fetched playlist and user data to Receipt */}
        </div>
    );
}

export default SavedPlaylistReceipts;