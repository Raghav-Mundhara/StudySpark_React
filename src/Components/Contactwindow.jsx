import React, { useState, useEffect} from 'react';
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
import { getDocs, collection, query, orderBy } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';
const ContactWindow = () => {
  const params = useParams();
  const { freelancer, client } = params;
  const currentUser = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [messages, setMessages] = useState([]); // Store messages in state
  const [imageUrls, setImageUrls] = useState([]);
  const [job, setJob] = useState(null);
  const [messageText, setMessageText] = useState('');
  const users = [freelancer, client];
  users.sort();
  const chatId = users[0] + users[1];
  const db = getFirestore();
  const navigate = useNavigate();
  // console.log(`curr:${currentUser}`);
  // console.log(currentUser?.email);
  useEffect(() => {
    const fetchJob = async () => {
      try{
        // console.log(params.id);
        const jobCollection = collection(db, "jobs");
        const jobSnapshot = await getDocs(jobCollection);
        jobSnapshot.forEach((doc) => {
          if(doc.id === params.id){
            setJob(doc.data());
            // console.log(doc.data());
          }
        });
      }catch(e){
        console.log(e);
      }
    };
  
    fetchJob();
  }, [params.id] )
  useEffect(() => {
    // console.log(job);
  })
  useEffect(() => { 
    const fetchData = async () => {
      try {
        // console.log("Freelancer: ", freelancer);
        // console.log("Client: ", client);
        const messagesRef = collection(db, "chats", chatId, "messages");
        const messagesQuery = query(messagesRef, orderBy("timestamp")); // Query to order messages by timestamp
        const querySnapshot = await getDocs(messagesQuery);
        const fetchedMessages = [];
        const fetchedImageUrls = []; // Array to store image URLs
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMessages.push(data);
          if (data.imageUrl) {
            fetchedImageUrls.push(data.imageUrl);
          }
        });
        setMessages(fetchedMessages);
        setImageUrls(fetchedImageUrls); // Update imageUrls state
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
  
    fetchData();
  
    return () => {};
  }, [chatId, db]);
  
  const handleFileUpload = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const uploadFile = async () => {
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
  
      await uploadBytes(storageRef, imageUpload);
  
      const imageUrl = await getDownloadURL(storageRef);
  
      setImageUrls(prevUrls => [...prevUrls, imageUrl]); // Update imageUrls state
  
      await addDoc(collection(db, "chats", chatId, "messages"), {
        imageUrl: imageUrl,
        timestamp: new Date(),
        sender: currentUser.email,
      });
      // console.log('Image uploaded and message added successfully.');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };
  
  const loadRazorpay =async () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => alert('Razorpay SDK failed to load. Are you online?');
    script.onload = () => {
      const amount = parseFloat(job.budget);
      
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
          navigate(`/review/${params.id}/${freelancer}/${client}`)
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
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        message: "Payment Completed",
        timestamp: new Date(),
        sender: currentUser.email,
      });
      setMessageText(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onAcceptClick = () => {
    const jobRef = doc(db, "jobs", params.id);
    updateDoc(jobRef, {
      status: "completed",
    });
    alert("Job marked as completed");
  }

  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        link: messageText,
        timestamp: new Date(),
        sender: currentUser.email,
      });
      setMessageText(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onResubmitClick = async () => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        message: "Resubmit the work with the required changes.",
        timestamp: new Date(),
      });
  
      // Fetch the updated messages and update the state
      const updatedMessagesRef = collection(db, "chats", chatId, "messages");
      const updatedMessagesQuery = query(updatedMessagesRef, orderBy("timestamp"));
      const updatedQuerySnapshot = await getDocs(updatedMessagesQuery);
      const updatedMessages = [];
      updatedQuerySnapshot.forEach((doc) => {
        updatedMessages.push(doc.data());
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };
  
  return (
    <div className="app">
  <div className="chat-window">
    {console.log(currentUser?.email)}
    {console.log(freelancer)}
    {console.log(client)}
    <h2>{currentUser?.email === freelancer ? client : freelancer}</h2>
    <div className="chat-content">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            {message.message && <p style={{ color: 'white' }} key={index}>{message.message}</p>}
            {message.imageUrl && <img key={index} src={message.imageUrl} alt="uploaded" />}
            {message.link &&  <a href={message.link}>Final Work : {message.link}</a>}
          </div>
        ))}
      </div>
    </div>
    <div className="chat-actions">
          {currentUser?.email===freelancer?<input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'block' }}
            id="file-upload"
          />:null}
          {/* <label htmlFor="file-upload" className="file-action-button">Select Files</label> */}
          {currentUser?.email === freelancer?<button onClick={uploadFile}>Upload File</button>:null}
          {currentUser?.email === client?<button onClick={onResubmitClick}>Resubmit</button>:null}
          {currentUser?.email===client?<button onClick={loadRazorpay}>Pay</button>:null}
          {currentUser?.email===client?<button onClick={onAcceptClick}>Accept</button>:null}
          {currentUser?.email===freelancer &&  job?.status==="completed"?<input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here"
          />:null}
          {currentUser?.email===freelancer &&  job?.status==="completed"?<button onClick={sendMessage}>Send</button>:null}
    </div>
  </div>
</div>

  );
};

export default ContactWindow;
