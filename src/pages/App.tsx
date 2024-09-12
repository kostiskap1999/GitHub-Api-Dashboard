import { useEffect, useState } from 'react';
import '../styles/App.scss';
import { getGithubUsers } from '../api/userApi';
import { UserModel } from '../model/userModel';

export default function App() {

  const [user, setUser] = useState<UserModel | null>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const loadAsyncData = async () => {
      console.log(process.env.REACT_APP_HOSTNAME)
      // let u: UserModel = new UserModel() //await getGithubUsers('kostiskap1999')
      // setUser(u)
    }
    loadAsyncData()
  }, [])

  const handleSearch = async () => {
    let u: UserModel = new UserModel(await getGithubUsers(search))
    setUser(u)
  }

  const clearSearch = async () => {
    setSearch('')
    setUser(null)
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter a username to show information"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={clearSearch}>Clear Search</button>

      {user && 
        <div className="row">
          <div>
            <span>Username</span>
            <span>{user.login}</span>
          </div>
          <div>
            <span>Name</span>
            <span>{user.name}</span>
          </div>
          <div>
            <span>Avatar URL</span>
            <span><img src={user.avatar_url ? user.avatar_url : ""}  alt="User Avatar" style={{maxHeight: '100px', maxWidth: '100px'}} /></span>
          </div>
          <div>
            <span>Location</span>
            <span>{user.location}</span>
          </div>
          <div>
            <span>Bio</span>
            <span>{user.bio}</span>
          </div>

          
        </div>
      }
    </div>
  )
}
