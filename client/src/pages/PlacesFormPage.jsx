import React, { useEffect, useState } from "react";
import preInput from "../components/preInput";
import Perks from "../Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [price,setPrice] = useState(100);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/places/" + id)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddedPhotos(data.addedPhotos);
        // setAddedPhotos(data.addedPhotos);
        setAddress(data.address);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
      .catch((error) => console.log(error));
  }, [id]);
  async function SavePlace(ev) {
    ev.preventDefault();
    const placedata={
      title,
          address,
          addedPhotos,
          description,
          perks,
          checkIn,
          checkOut,
          maxGuests,
          extraInfo,
          price,
    }
    if (id) {
      try {
        await axios.put("/places", {
          id,
          ...placedata
        });
        setRedirect(true);
      } catch (err) {
        setError("Failed to create new place. Please try again later.");
        console.error("Error creating place:", err);
      }
    } else {
      try {
        await axios.post("/places", placedata);
        setRedirect(true);
      } catch (err) {
        setError("Failed to create new place. Please try again later.");
        console.error("Error creating place:", err);
      }
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={SavePlace}>
        {preInput(
          "Title",
          "Title for your place, should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example my lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the place")}
        <textarea
          rows={5}
          className="h-max-content rounded-xl"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Enter all the perks to your place")}
        <div>
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "House rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check in & out times",
          "Add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="primary my-4">
            Save
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
