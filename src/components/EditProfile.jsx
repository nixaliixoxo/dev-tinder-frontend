import axios from "axios";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photo, setPhoto] = useState(user?.photoURL);
  const [error, setError] = useState(""); 
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false); 

const handleButtonClick = async () => {
  try {
    if (isEditing) {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        { firstName, lastName, age, gender, about, photo },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setIsEditing(false);
      setError("");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      setIsEditing(true);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError("Something went wrong");
    }
  }
};

return (
  <div className="flex flex-col items-center my-10 relative">
    {/* Toast Notification */}
    {toast && (
      <div className="toast toast-top toast-center absolute top-0">
        <div className="alert alert-success">
          <span>Profile saved successfully!</span>
        </div>
      </div>
    )}

    {/* Edit Profile Card */}
    <div className="card bg-base-200 w-96 shadow-sm mt-10">
      <div className="card-body">
        <h2 className="card-title justify-center">EDIT PROFILE</h2>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Profile Photo</legend>
            <input
              type="text"
              className="input"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <p className="text-red-600">{error}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleButtonClick}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default EditProfile;

