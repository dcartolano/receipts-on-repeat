// import user model
import Receipt from '../models/Receipt.js';

export const getAllReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find();

        // res.json({ message: 'showing all receipts!', receipts });
        // res.status(200).json({ receipts });
        res.status(200).json(receipts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReceipt = async (req, res) => {
    try {
        const receipt = await Receipt.create(req.body);

        if (!receipt) {
            return res.status(400).json({ Message: 'something is wrong!' });
        }

        res.status(200).json('receipt saved!');
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

export const deleteComment = async (req, res) => {
    console.log(req.params.receiptId);
    try {
        const updatedReceipt = await Receipt.findOneAndUpdate(
            { _id: req.params.receiptId },
            { $unset: {comment: ""} },
            { new: true }
        );

        if (!updatedReceipt) {
            return res.status(400).json({ Message: 'something is wrong!' });
        }

        res.status(200).json({ Message: 'comment deleted!', updatedReceipt: updatedReceipt });
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

export const deleteReceipt = async (req, res) => {
    try {
        const deletedReceipt = await Receipt.findOneAndDelete(
            {_id: req.params.receiptId},
        );

        if (!deletedReceipt) {
            return res.status(400).json({ Message: 'something is wrong!' });
        }

        res.status(200).json('receipt deleted!');
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
};