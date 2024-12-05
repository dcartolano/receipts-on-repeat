import React, { useEffect, useState } from 'react';
import SavedReceipt from '../components/SavedReceipt/index.jsx';
import { getAllReceipts } from '../utils/Api.js';

const SavedPlaylistReceipts = () => {

    const [receiptData, setReceiptData] = useState([]);

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
            {receiptData.length > 0 ? (
                receiptData.map((receipt, index) => (
                    <div key={index}>
                        <SavedReceipt receipt={receipt} />
                    </div>
                ))
            ) : (
                <div>
                    <p>No playlists saved yet!</p>
                </div>
            )}
        </div>
    );
}

export default SavedPlaylistReceipts;