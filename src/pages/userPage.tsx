import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { UserModel } from '../model/userModel';

interface Props {
  userProp?: UserModel | null
}

export default function UserPage({userProp}: Props) {

  const [user, setUser] = useState<UserModel | null>(userProp || null)


  useEffect(() => {
    const loadData = async () => {
      if(userProp)
        setUser(userProp)
    }
    loadData()
  }, [userProp])


  return (
    <div className="App">

      {user ? 
        <div className="row">
          {user.login &&
            <div>
              <span>Username</span>
              <span>{user.login}</span>
            </div>
          }
          {user.name &&
            <div>
              <span>Name</span>
              <span>{user.name}</span>
            </div>          
          }
          {user.avatar_url &&
            <div>
              <span>Avatar URL</span>
              <span><img src={user.avatar_url ? user.avatar_url : ""}  alt="User Avatar" style={{maxHeight: '100px', maxWidth: '100px'}} /></span>
            </div>
          }
          {user.location &&
            <div>
              <span>Location</span>
              <span>{user.location}</span>
            </div>
          }
          {user.bio &&
            <div>
              <span>Bio</span>
              <span>{user.bio}</span>
            </div>
          }
          {user.followers &&
            <div>
              <span>Number of Followers</span>
              <span>{user.followers}</span>
            </div>
          }
          {user.public_repos &&
            <div>
              <span>Public Repos</span>
              <span>{user.public_repos}</span>
            </div>
          }
        </div>
    : <div>Search a user and their info will appear here.</div>
    }
    </div>
  )
}
