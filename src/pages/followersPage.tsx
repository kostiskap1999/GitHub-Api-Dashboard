import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUserFollowers } from '../api/userApi';
import { IUser, UserModel } from '../model/userModel';
import UserPage from './userPage';

interface Props {
  userProp?: UserModel | null
}

export default function FollowersPage({userProp}: Props) {
  
  const [followers, setFollowers] = useState<UserModel[] | null>(null)
  const [user, setUser] = useState<UserModel | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if(userProp){
        let followersList = await getGithubUserFollowers(userProp.login ? userProp.login : '')
        if(followersList){
          followersList.forEach((follower: IUser) => {
            new UserModel(follower)
          })
      
          setFollowers(followersList)
          setUser(userProp)
        }
          
      }
    }
    loadData()
  }, [userProp])

  return (
    <div className="App">

      {followers && user ? 
        <div>
          <h1>{user.login}'s Followers</h1>
          <div>{user.login}'s Total Followers are {user.followers}</div>
          <ul>
            {followers.map((follower) => (
              <UserPage userProp={follower} />
            ))}
          </ul>

        </div>
    : <div>Search a user and their followers will appear here.</div>
    }
    </div>
  )
}
