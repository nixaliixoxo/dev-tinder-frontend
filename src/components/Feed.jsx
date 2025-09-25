import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async() => {
    try{
      if(feed) return;
      const res = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    }
    catch(err){
      // console.log("ERROR: ", err.message);
    }
  };

  useEffect(()=>{
    getFeed();
    console.log(feed);
  }, []);

  if(!feed) return;
  if(feed.length === 0) return <h1>No More Users to show</h1>;

  return (
    <div>
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p>Loading feed...</p>
      )}
    </div>
  );
}

export default Feed;