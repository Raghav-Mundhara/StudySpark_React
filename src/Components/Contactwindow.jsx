import React, { useState,useEffect } from 'react'; // Ensure useState is imported
import { auth, db } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import "../style.css";
const ContactWindow = ({ activeContact }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };




const loadRazorpay = () => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onerror = () => alert('Razorpay SDK failed to load. Are you online?');
  script.onload = () => {
    // Display a prompt to get the amount from the user
    const amountInput = prompt('Enter the amount to pay (in INR):');
    
    // Check if the user entered a valid amount
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount. Please enter a valid positive number.');
      return;
    }

    const paymentData = {
      key: "rzp_test_EqmTf7cyKE7Dal",
      amount: (amount * 100).toString(), 
      currency: "INR",
      name: "Payment for Services",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer_email@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(paymentData);
    paymentObject.open();
  };
  document.body.appendChild(script);
};



  return (
    <div className="chat-window">
      <h2>{activeContact.email}</h2>
      <div className="chat-content">
        
      </div>
      <div className="chat-actions">
        <input type="file" onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="file-action-button" onClick={uploadFile}>Upload</label>
        {imageUrls.map((url) => {
        return <img src={url} />;
      })}
        <button onClick={loadRazorpay}>Pay</button>
      </div>
    </div>
  );
};

export default ContactWindow;