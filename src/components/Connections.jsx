import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections)
  const dispatch = useDispatch()

  const fetchUserConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      })
      dispatch(addConnections(res.data.data))
    } catch (err) {
      // console.log("ERROR: ", err.message);
    }
  }

  useEffect(() => {
    fetchUserConnections()
  }, [])

  if (!connections) return
  if (connections.length === 0) return <h1>No Connections found</h1>

  return (
    <div className="p-4 grid gap-4 justify-center">
      {connections.map((conn) => (
        <div
          key={conn._id}
          className="flex items-center bg-blue-200 shadow-md rounded-xl p-4 w-96"
        >
          <img
            src={conn.photo || "https://test-hcc.unitedlayer.com/wp-content/uploads/2020/01/dummy-profile.jpg"}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-gray-600 font-bold text-lg">
              {conn.firstName + " " + conn.lastName}
            </h2>
            <p className="text-gray-600 text-sm">{conn.about}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Connections
