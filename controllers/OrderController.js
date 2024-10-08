import OrderModel from "../models/Orders.js";

export const createOrder = async (req, res) => {
    try {
        const { name, surname, email, phone, price, time, status, orders, number } = req.body;

        console.log('Order Data:', req.body); // Log the request body for debugging

        const doc = new OrderModel({
            name,
            surname,
            email,
            phone,
            price,
            time,
            status,
            orders,
            number,
        });

        console.log('Order Document:', doc); // Log the order document

        const order = await doc.save();
        res.json(order);
    } catch (err) {
        console.error('Error creating order:', err.message); // Log the error message
        console.error('Error stack trace:', err.stack); // Log the stack trace for more details
        res.status(500).json({
            message: 'Не удалось выполнить заявку на покупку',
            error: err.message, // Include the error message in the response
        });
    }
};


export const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch orders'
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};
