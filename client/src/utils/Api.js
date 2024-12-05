export const createReceipt = async (receiptData) => {
  try {
    const response = await fetch('/spotify/receipts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receiptData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.error('Failed to create receipt:', error);
    throw error;
  }
};

export const getAllReceipts = async () => {
  try {
    const response = await fetch('/spotify/receipts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.error('Failed to fetch receipts:', error);
    throw error;
  }
  // return fetch('/spotify/receipts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }

  // )
};

export const deleteComment = async (receiptId) => {
  console.log(receiptId);
  console.log(JSON.stringify(receiptId));
  try {
    const response = await fetch(`/spotify/receipts/${receiptId}`, {
      method: 'PUT',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // // body: JSON.stringify(receiptId),
      // body: receiptId,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};

export const deleteReceipt = async (receiptId) => {
  try {
    const response = await fetch(`/spotify/receipts/${receiptId}`, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(receiptId),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.error('Failed to delete receipt:', error);
    throw error;
  }
};