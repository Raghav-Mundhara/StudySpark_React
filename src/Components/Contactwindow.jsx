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
    script.onload = async () => {
      // Fetch the amount from Firestore
      try {
        const userId = 'your_user_id'; // Replace with the actual user ID or any identifier you use
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
  
        if (userData) {
          const amount = userData.budget || 50000; // Default to 50000 if budget is not available
  
          const paymentData = {
            key: "rzp_test_EqmTf7cyKE7Dal",
            amount: amount.toString(),
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
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching amount from Firestore:", error);
      }
    };
    document.body.appendChild(script);
  };
  

  

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     alert('No file selected!');
  //     return;
  //   }

  //   // Simulate the upload process
  //   setUploadedFiles(prevFiles => [...prevFiles, file]);
  //   alert('File uploaded: ' + file.name);

  //   // Reset the file input after upload
  //   event.target.value = '';
  // };

  // const handlePayment = () => { // Ensure handlePayment is defined
  //   alert('Payment functionality to be implemented.');
  // };

  // const handleDelete = (fileName) => { // Define a method to handle file deletion
  //   setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  // };

  // const handleAccept = (fileName) => { // Example accept function
  //   alert(`${fileName} accepted`);
  //   // Implement acceptance logic here
  // };

  // const handleReject = (fileName) => { // Example reject function
  //   alert(`${fileName} rejected`);
  //   // Here you could simply delete the file or move it to a 'rejected' list
  //   handleDelete(fileName); // For simplicity, we'll just delete it
  // };

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
