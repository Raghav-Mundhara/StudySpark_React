import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import "../style.css";
import { useParams } from 'react-router-dom';
import { addDoc, getFirestore, updateDoc , doc } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';
import { debounce } from 'lodash';
// import { db } from '../firebase';
const ContactWindow = () => {
  const params = useParams();
  const { freelancer, client } = params;
  const currentUser = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const users = [freelancer, client];
  users.sort();
  const chatId = users[0] + users[1];
  const db=getFirestore();
  
  useEffect(() => { 
    const fetchData = debounce(async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chats", chatId, "messages"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          if (doc.data().imageUrl) {
            getDownloadURL(ref(storage, doc.data().imageUrl)).then((url) => {
              setImageUrls((prev) => [...prev, url]);
            });
          }
        });
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }, 500);
  
    fetchData();
  
    return fetchData.cancel;
  }, [chatId, db]);
  
  const handleFileUpload = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const uploadFile = () => {
    try {
      if (!imageUpload) {
        console.error('No file selected.');
        return;
      }

      if (!chatId) {
        console.error('No chat ID provided.');
        return;
      }

      const storageRef = ref(storage, `chat/${chatId}/${v4()}`);

      uploadBytes(storageRef, imageUpload)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
          addDoc(collection(db, "chats", chatId, "messages"), {
            // message: 'Image uploaded',
            imageUrl: storageRef.fullPath,
            timestamp: new Date(),
            sender: currentUser.email,
          });
        })
        .catch((uploadError) => {
          console.error('Error uploading file: ', uploadError);
        });
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
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

  const onAcceptClick=()=>{
    const jobRef = doc(db, "jobs", params.id);
    updateDoc(jobRef, {
      status: "completed",
    });
  }

  const onResubmitClick=()=>{
    const chatRef = doc(db, "chats", chatId, "messages");
    addDoc(chatRef, {
      message: "Resubmit",
      timestamp: new Date(),
    });
  }
  return (
    <div className="chat-window">
      <h2>{currentUser === freelancer ? client : freelancer}</h2>
      <div className="chat-content">
        <div className="chat-messages">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt="uploaded" />
          ))}
        </div>
      </div>
      <div className="chat-actions">
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-action-button">Select Files</label>
        <button onClick={uploadFile}>Upload File</button>
        <button onClick={loadRazorpay}>Pay</button>
        <button onClick={onAcceptClick}>Accept Work</button>
        <button>Ask to Resubmit</button>
      </div>
    </div>
  );
};

export default ContactWindow;
