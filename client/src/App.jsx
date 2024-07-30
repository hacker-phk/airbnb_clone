import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContextProvider";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
axios.defaults.baseURL = "https://airbnb-clone-4r6malebv-kumars-projects-74634024.vercel.app";
axios.defaults.withCredentials = true;
import PlacePage from "./pages/Placepage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { useEffect } from "react";
function App() {
  useEffect(()=>{
    document.documentElement.classList.add('dark');
  },[]);
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/place/:id"  element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookingPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
