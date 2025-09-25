import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id, firstName, lastName, photoURL, about} = user;

    const dispatch = useDispatch();

    const handleSendRequest = async(status, toUserId) => {
        try{
            const res = await axios.post("http://localhost:3000/request/send/" + status + "/" + toUserId,
                {},
                {withCredentials: true}
            )
            dispatch(removeUserFromFeed(toUserId));
        }
        catch(err){
            // console.log("ERROR: ", err.message);
        }
    }

  return (
    <div className="flex justify-center p-3">
  <div className="card bg-amber-50 w-72 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
    <figure className="px-4 pt-4">
      <img
        src={
          photoURL
            ? photoURL
            : "https://test-hcc.unitedlayer.com/wp-content/uploads/2020/01/dummy-profile.jpg"
        }
        alt="user-image"
        className="rounded-lg object-cover h-40 w-full"
      />
    </figure>
    <div className="card-body items-center text-center p-4">
      <h2 className="card-title text-lg font-semibold text-gray-800">
        {firstName + " " + lastName}
      </h2>
      <p className="text-sm text-gray-600">
        {about || "This is my devTinder Profile"}
      </p>
      <div className="card-actions mt-3 flex gap-3">
        <button className="btn btn-success btn-sm px-4 rounded-full shadow-sm hover:scale-105 transition-transform"
        onClick={() => handleSendRequest("interested", _id)}>
          Interested
        </button>
        <button className="btn btn-error btn-sm px-4 rounded-full shadow-sm hover:scale-105 transition-transform"
        onClick={() => handleSendRequest("ignored", _id)}>
          Ignore
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserCard;