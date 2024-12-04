import React from 'react';
import { useState, useEffect } from 'react';
import Receipt from "../components/Receipt/index.jsx";
import { getAllReceipts } from '../utils/Api.js';

const PlaylistReceipt = () => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [receiptData, setReceiptData] = useState([]);

    // Retrieve the selected playlist from local storage
    const selectedPlaylist = JSON.parse(localStorage.getItem('selectedPlaylist'));

    const getReceiptData = async () => {        
        try {
            const response = await getAllReceipts();
            // console.log(response.json());

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            // console.log('getAllReceipts response:', response);
            setReceiptData(data);
        } catch (err) {
            console.error(err);
        };
    }

    useEffect(() => {
        getReceiptData();
    }, []);

    return (
        <div>
            <Receipt playlist={selectedPlaylist} userData={userData} /> 
            {/* Pass the selected playlist and user data to Receipt */}
            {/* {receiptData.length > 0 ? (
                receiptData.map((receipt, index) => (
                    <div key={index}>
                        <Receipt 
                        playlist={receipt} 
                        userData={userData} 
                        />
                    </div>
                ))
            ) : (
                <div>
                    <p>please select a receipt from your user profile!</p>
                </div>
            )
            } */}
        </div>
    );
}

export default PlaylistReceipt;