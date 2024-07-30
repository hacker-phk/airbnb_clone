import React from "react";


export default function PlaceImg({ place,index=0 ,classname=null}) {
  if (!place.addedPhotos?.length) {
    return "";
  }
  if(!classname) 
  {
    classname ="object-cover"
  }
  return (
    <img
      className={classname}
      src={"http://localhost:5000/uploads/" + place.addedPhotos[index]}
      alt=""
    />
  );
}
