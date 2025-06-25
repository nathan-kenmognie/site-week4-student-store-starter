import { useState } from 'react';
import './OrderCard.css';


const  OrderCard = ({order, onClick}) => {
    if (!order || !order.items || order.items.length === 0) {
        return <div className="order-card">No items in this order.</div>;
    }
    const handleClick = () => {
        if (onClick) {
            onClick(order);
        }
    };

    return (
            <div className="order-card" onClick={handleClick}>
                <h2>Order ID: {order.id}</h2>
                <p>Customer {order.customer}</p>
                <p>Email: {order.email}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Status: {order.status}</p>
            
            </div>

    );
};
export default OrderCard;


