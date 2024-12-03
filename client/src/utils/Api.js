export const createReceipt = (receiptData) => {
    return fetch('/spotify/receipts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receiptData),
    });
  };