import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const fetchRequests = async() => {
        try{
            const res = await axios.get("http://localhost:3000/user/pendingrequests", {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.data));
            console.log(res.data.data);
        }
        catch(err){
            console.log("ERROR: ", err.message);
        }
    }

    const reviewRequests = async(status, requestId) =>{
        try{
            const res = await axios.post("http://localhost:3000/request/review/" + status + "/" + requestId, 
                {},
                {withCredentials: true}
            );
            dispatch(removeRequest(requestId));
        }
        catch(err){

        }
    }

    useEffect(()=>{
        fetchRequests();
    }, [])

    if(!requests) return;
    if(requests.length === 0) return <h1>No pending requests</h1>;

  return (
  <div className="p-4 grid gap-4 justify-center">
    {requests.map((reqq) => (
      <div
        key={reqq._id}
        className="flex flex-col bg-green-200 shadow-md rounded-xl p-4 w-96"
      >
        {/* Top part with image + details */}
        <div className="flex items-center">
          <img
            src={
              reqq.fromUserId.photo ||
              "https://test-hcc.unitedlayer.com/wp-content/uploads/2020/01/dummy-profile.jpg"
            }
            alt="profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-gray-700 font-bold text-lg">
              {reqq.fromUserId.firstName + " " + reqq.fromUserId.lastName}
            </h2>
            <p className="text-gray-600 text-sm">{reqq.fromUserId.about}</p>
          </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
          onClick={()=> reviewRequests("accepted", reqq._id)}>
            Accept
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
          onClick={()=> reviewRequests("rejected", reqq._id)}>
            Reject
          </button>
        </div>
      </div>
    ))}
  </div>
);

}

export default Requests;