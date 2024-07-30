import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./UserContextProvider";
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(userContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkIn),
      new Date(checkOut)
    );
    numberOfDays=Math.abs(numberOfDays);
    console.log(numberOfDays);
  }
  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="text-xl text-center">Price: {place.price} /Per night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in</label>
            <input type="date" onChange={(ev) => setCheckIn(ev.target.value)} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out</label>
            <input
              type="date"
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setphone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {numberOfDays > 0 && (
          <>
            <span> $ {numberOfDays * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
}
