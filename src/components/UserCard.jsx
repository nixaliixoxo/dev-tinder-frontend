import React from 'react'

const UserCard = ({userFeed}) => {
    const {firstName, lastName, photoURL, about} = userFeed;
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
        <button className="btn btn-success btn-sm px-4 rounded-full shadow-sm hover:scale-105 transition-transform">
          Interested
        </button>
        <button className="btn btn-error btn-sm px-4 rounded-full shadow-sm hover:scale-105 transition-transform">
          Ignore
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserCard;