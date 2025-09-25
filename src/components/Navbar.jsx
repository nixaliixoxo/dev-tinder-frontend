import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((store)=> store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try{
            const res = await axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true,
            });
            dispatch(removeUser());
            navigate("/login");
        } catch(err){
            // console.error("ERROR: ", err.message);
        }
    }

  return (
    <div>
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                {user && 
                (
                <div className="flex justify-between">
                    <p className="m-2">Welcome {user.firstName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                        </div>
                    </div>
                </div>
                )}
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to="/profile" className="justify-between">
                        Profile
                    </Link>
                    </li>
                    <li>
                    <Link to="/connections" className="justify-between">
                        Connections
                    </Link>
                    </li>
                    <li>
                    <Link to="/requests" className="justify-between">
                        Requests
                    </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;