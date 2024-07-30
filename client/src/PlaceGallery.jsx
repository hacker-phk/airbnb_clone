import React from "react";
import { useState } from "react";
export default function PlaceGallery({place}) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className="absolute inser-0 bg-black text-white min-h-screen ">
            <div className="p-8 grid gap-4 bg-black">
              <div>
                <h2 className="text-2xl  mr-36">Photos of {place.title}</h2>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="fixed right-12 top-8 flex gap-1 py-1 px-4 rounded-2xl shadow shadow-black bg-white text-black"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Close photos
                </button>
              </div>
              {place?.addedPhotos?.length > 0 &&
                place.addedPhotos.map((photo) => (
                  <div>
                    <img src={"http://localhost:5000/uploads/" + photo} alt="" />
                  </div>
                ))}
            </div>
          </div>
        );
      }
  return (
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl">
      <div>
        {place.addedPhotos?.[0] && (
          <div className="w-full h-full">
            <img
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${place.addedPhotos[0]}`}
            />
          </div>
        )}
      </div>
      <div className="grid ">
        {place.addedPhotos?.[1] && (
          <img
            onClick={() => setShowAllPhotos(true)}
            className="aspect-square cursor-pointer object-cover"
            src={`http://localhost:5000/uploads/${place.addedPhotos[1]}`}
          />
        )}
        <div className="overflow-hidden">
          {place.addedPhotos?.[2] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover relative top-2"
              src={`http://localhost:5000/uploads/${place.addedPhotos[2]}`}
            />
          )}
        </div>
      </div>
    </div>
    <button
      onClick={() => setShowAllPhotos(true)}
      className="absolute bottom-2 right-1 px-2 py-2 bg-white rounded-2xl shadow-gray-500 flex gap-1 text-sm"
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
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      Show more photos
    </button>
  </div>
  

  );
}
