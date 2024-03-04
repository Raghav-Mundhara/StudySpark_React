import React, { useState,useEffect } from 'react'; // Ensure useState is imported
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
        <button >Pay</button>
      </div>
    </div>
  );
};

export default ContactWindow;
