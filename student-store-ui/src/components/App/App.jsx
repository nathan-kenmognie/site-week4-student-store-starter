import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";
import PastOrders from "../PastOrders/PastOrders";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [pastOrders, setPastOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([])


  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };



  const handleSearchType = (searchValue, currentPath) =>{
    try {
      if (currentPath === "/orders"){
        if(searchValue.trim()){
          handleOrderSearchByEmail(searchValue)

        }else{
          setFilteredOrders(pastOrders)
        }
      }else{
        setSearchInputValue(searchValue)
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleOrderSearchByEmail = async(email) =>{
    try {

      const response = await fetch(`http://localhost:3000/orders/${email}/email`)
      const orders = await response.json()
      setFilteredOrders(orders)
      return orders

    } catch (error) {
      console.log(error.message)
      setFilteredOrders([])
    }
    

  }
  
  const fetchAllOrders = async() =>{
    try {
      const response = await fetch(`http://localhost:3000/orders`)
      const orders = await response.json()
      setFilteredOrders(orders)
      setPastOrders(orders)
      
    } catch (error) {
      console.log(error.message)
      
    }

  }
  

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);
    if (!userInfo.name.trim()&& !userInfo.email.trim()) {
      setError("Please enter your name");
      return;
    }

    const orderItems = Object.entries(cart).map(([productId, quantity]) =>{
      const product = products.find((p)=>
         p.id === parseInt(productId)
      )

      return{
        productId: parseInt(productId),
        quantity: quantity,
        price: product.price
      }


    })

    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


    const orderData = {
      customer:  userInfo.name.trim(),
      email: userInfo.email.trim(),
      status: "pending",
      total: total,
      orderItems: orderItems
    }

    try {
      const response = await axios.post("http://localhost:3000/orders/create", orderData);
      setOrder(response.data);
      setCart({});
      setUserInfo({ name: "", dorm_number: "" });
      setSidebarOpen(false)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCheckingOut(false);
    }



  }
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProducts();
    fetchAllOrders();
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
            handleSearchType={handleSearchType}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <PastOrders
                orders= {filteredOrders}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
          
          
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 