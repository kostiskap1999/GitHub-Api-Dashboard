import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUserFollowers } from '../api/userApi';
import { IUser, UserModel } from '../model/userModel';
import UserPage from './userPage';

interface Props {
  userProp?: UserModel | null
}

export default function FollowersPage({userProp}: Props) {
  
  const [followers, setFollowers] = useState<UserModel[]>([])
  const [user, setUser] = useState<UserModel | null>(null)

  // Implementing pagination
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (userProp !== user){
        setFollowers([])
        setHasMore(true)
      }

      if(userProp && hasMore){
        const followersList = await getGithubUserFollowers(userProp.login || '', page)   
        if (followersList && followersList.length > 0){
          followersList.forEach((follower: IUser) => { new UserModel(follower) })
          setFollowers((prevFollowers) => [...prevFollowers, ...followersList])
        }
        else
          setHasMore(false)
        setUser(userProp)
      }
    }
    loadData()
  }, [userProp, page, hasMore])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
        return
      
      setPage(prevPage => prevPage + 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])


  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className='container'>
      {followers && user ? 
        <div>
          <div className='center'>
            <div className='heading'>{user.login}'s Followers</div>
            <div>{user.login}'s Total Followers are {user.followers}</div>
          </div>
          <div>
            {followers.map((follower) => (
              <div  key={follower.id}>
                <UserPage userProp={follower} />
              </div>
            ))}
          </div>
          {hasMore ?
            <div className='row'>
              <button onClick={() => loadMore()}>Load More</button>
            </div>
          :
            <div className='row'>
              No more followers to load.
            </div>
          }
        </div>
    : <div className='row'>Search a user and their followers will appear here.</div>
    }
    </div>
  )
}
