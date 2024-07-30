import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      console.log(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 rounded-full px-6"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new Place
        </Link>
        <div className="mt-4 ">
          {places.length > 0 &&
            places.map((place) => (
              <Link to={'/account/places/'+place._id}
                key={place._id}
                className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer"
              >
                <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl ">{place.title}</h2>
                  <p className="mt-2 text-sm ">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
