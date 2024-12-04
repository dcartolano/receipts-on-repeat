export const createReceipt = (receiptData) => {
  return fetch('/spotify/receipts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(receiptData),
  });
};

export const getAllReceipts =  () => {
  // try {
  //   const response =  fetch('/spotify/receipts');
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   // const data = await response.json();
  //   // console.log(data);
  //   // console.log(data.receipts);
  //   // return data;
  //   return response;
  // } catch (error) {
  //   console.error('Failed to fetch questions:', error);
  //   throw error;
  // }
  return fetch('/spotify/receipts'
    , {
      method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
)
};
