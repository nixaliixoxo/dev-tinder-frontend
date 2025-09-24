import { Outlet, useNavigate } from 'react-router'
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=> store.user);

  const fetchUser = async() => {
    try{
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch(err){
      navigate("/login");
      console.log("ERROR: ", err.message);
    }
  };

  useEffect(() => {
    if(!userData){
      fetchUser();    
    }
  }, []);

  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body;