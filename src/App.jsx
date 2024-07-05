import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [shoe, setShoe] = useState({
    name: "White Shoes",
    img: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg",
    price: 500,
  });

  const initPay = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: shoe.name,
      description: "Test",
      image: shoe.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL =
            import.meta.env.VITE_BASE_URL + "api/payment/verify";
          const { data } = await axios.post(verifyURL, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = import.meta.env.VITE_BASE_URL + "api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: shoe.price,
        currency: "INR",
      });
      console.log(data);
      initPay(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="shoe_container">
        <img
          src={shoe.img}
          alt="shoe_img"
          className="shoe_img"
          style={{ height: "300px", width: "300px" }}
        />
        <p className="shoe_name">{shoe.name}</p>
        <p className="shoe_price">Price: {shoe.price}</p>
        <button onClick={handlePay} className="buyBtn">
          Click here to Buy Shoes
        </button>
      </div>
    </div>
  );
}

export default App;
