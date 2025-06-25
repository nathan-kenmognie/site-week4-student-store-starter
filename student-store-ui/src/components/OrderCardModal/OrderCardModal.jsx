import './OrderCardModal.css';
import { useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';

const OrderCardModal = ({ order, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen || !order) {
    return null;
  }

  return (
    <div className="OrderCardModal">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>X</button>
        <div className='order-details'>
                <h2>Order Details</h2>
            <p>Order ID: {order.id}</p>
            <p>Customer: {order.customer}</p>
            <p>Email: {order.email}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="total">Total: ${order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            
        </div>
        <h3>Items:</h3>
            <ul>
            {order.items.map(item => (
                <li key={item.id}>
                Name: {item.product.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}
                </li>
            ))}
            </ul>
        
      </div>
        
    </div>
  );
}
export default OrderCardModal;