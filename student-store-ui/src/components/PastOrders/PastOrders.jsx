import './PastOrders.css'
import OrderCard from '../OrderCard/OrderCard'
import OrderCardModal from '../OrderCardModal/OrderCardModal'
import { useEffect, useState } from 'react';


const PastOrders = ({orders}) =>{
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    
return (
        <div className='PastOrders'>
            <h1>Past Orders</h1>
            <div className="orders-container">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                            onClick={handleOrderClick}
                        />
                    ))
                ) : (
                    <div className="no-orders">
                        {orders && orders.length === 0 ? 
                            "No orders found for this search" : 
                            "Loading orders..."
                        }
                    </div>
                )}
            </div>

            {selectedOrder && (
                <OrderCardModal 
                    order={selectedOrder} 
                    onClose={handleCloseModal}
                    onClick={handleOrderClick}
                />
            )}
        </div>

    )
}

export default PastOrders