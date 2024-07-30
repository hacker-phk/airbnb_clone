import { Link } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { useEffect, useState } from "react";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);  // Corrected to avoid duplicating data
      console.log(response.data);
    });
  }, []);

  return (
    <div className="gap-y-8 gap-x-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place._id} to={`/place/${place._id}`}>
            <div className="bg-gray-500 rounded-2xl">
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`http://localhost:5000/uploads/${place.addedPhotos[0]}`}
                alt={place.title}
                onError={(e) => {
                  console.error("Image not found:", e.target.src);
                  e.target.style.display = "none";
                }}
              />
            </div>
            <h2 className="text-sm truncate">{place.title}</h2>
            <h3 className="font-bold">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
