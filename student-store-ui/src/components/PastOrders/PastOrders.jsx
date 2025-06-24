import './PastOrders.css'
import OrderCard from '../OrderCard/OrderCard'
import { useEffect, useState } from 'react';


const PastOrders = () =>{
    const [orders, setOrders] = useState([]);


    const fetchOrders = async() =>{
        try {
            const response = await fetch('http://localhost:3000/orders')
            const orders = await response.json()
            setOrders(orders)
            
        } catch (error) {
            console.log(error.message)
        }




    }
    useEffect(() => {
        fetchOrders();
    }, []);    
    
    return (
        <div className='PastOrders'>
            <div className="orders-container">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
        </div>

    )
}

export default PastOrders