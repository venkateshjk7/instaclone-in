import React, { useEffect, useState } from 'react' 
import axios from 'axios'; 

function Suggestions() {

  const [profile,setProfile] = useState();
  const [suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    fetch("https://json-db-pey8.onrender.com/profile")
    .then(data=> data.json())
    .then(data=> setProfile(data))
    .catch(err=> console.log(err))
    
    fetch("https://json-db-pey8.onrender.com/suggestions")
    .then(data=> data.json())
    .then(data=> setSuggestions(data))
    .catch(err=> console.log(err))

  },[]);

  const handleFollow = async(id, username)=>{
    axios.post('https://json-db-pey8.onrender.com/followers',{"id":id, "username": username})
    .then(alert('followed'))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="suggestions w-75 m-4">
          {profile ?
          <div className="d-flex">
              <img className="dp rounded-circle" src={profile.profile_pic} alt="Profile pic" />
              <h5>{profile.username}</h5>
              <small className="ms-auto text-primary">Switch</small>
          </div>
          : <p>Loading</p>}

          <div className="d-flex">
            <p>Suggested for you</p>
            <p className="ms-auto"><b>See All</b></p>
          </div>

          {suggestions.length>0 ? (
            <div>
                {suggestions.map((suggestion) => (
                    <div className="my-2" key={suggestion.id}>
                        <div className="d-flex">
                            <img className="dp rounded-circle" src={suggestion.profile_pic} alt="Profile pic" />
                            <h5>{suggestion.username}</h5>
                            <a className="text-primary ms-auto" onClick={()=>(handleFollow(suggestion.id,suggestion.username))}>Follow</a>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div>
                Loading 
            </div>
        )}

      </div>
    </div>
  )
}


export default Suggestions
