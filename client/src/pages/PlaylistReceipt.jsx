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
            const receipts = await getAllReceipts();

            if (!receipts) {
                throw new Error('something went wrong!');
            }

            setReceiptData(receipts);
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
        </div>
    );
}

export default PlaylistReceipt;