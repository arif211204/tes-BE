// controllers/paymentTypeController.js

const { PaymentType } = require('../models');

async function getAllPaymentTypes(req, res) {
    try {
        const paymentTypes = await PaymentType.findAll();
        res.json(paymentTypes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createPaymentType(req, res) {
    const { jenis, deskripsi } = req.body;
    try {
        const newPaymentType = await PaymentType.create({
            jenis,
            deskripsi
        });
        res.status(201).json(newPaymentType);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllPaymentTypes,
    createPaymentType
};
