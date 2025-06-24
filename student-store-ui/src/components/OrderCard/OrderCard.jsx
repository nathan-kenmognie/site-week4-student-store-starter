import { useState } from 'react';
import './OrderCard.css';


const  OrderCard = ({order}) => {
    if (!order || !order.items || order.items.length === 0) {
        return <div className="order-card">No items in this order.</div>;
    }
    return (
        <div className="order-card">
            <h2>Order ID: {order.id}</h2>
            <p>Customer {order.id}</p>
            <p>Email {order.email}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
                {order.items.map(item => (
                    <li key={item.id}>
                        Name: {item.product.name} Quantity: {item.quantity} Price: ${(item.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default OrderCard;


