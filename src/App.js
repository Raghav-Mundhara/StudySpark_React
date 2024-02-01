import Login from "./Components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register.jsx";
import {NextUIProvider} from "@nextui-org/react";
import Profile from "./Components/Profile.jsx";
import JobPage from "./Components/JobPage.jsx";
import JobListing from "./Components/JobListing.jsx";
import PostJob from "./Components/PostJob.jsx";
import EditProfile from "./Components/EditProfile.jsx";
function App() {
  return (
    <NextUIProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Jobpage" element={<JobPage/>}/>
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/joblisting" element={<JobListing/>} />
        <Route path="/postjob" element={<PostJob/>} />
        <Route path="/JobListing" element={<JobListing/>}/>
  
      </Routes>
    </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
