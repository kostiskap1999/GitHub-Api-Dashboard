import { FormEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserPage from './pages/userPage';
import FollowersPage from './pages/followersPage';
import { UserModel } from './model/userModel';
import { getGithubUsers } from './api/userApi';
import ReposPage from './pages/reposPage';
import './styles/general.scss';


function App() {

  const [lastInputValue, setLastInputValue] = useState('')
  const [inputValue, setInputValue] = useState<string>('')

  const [user, setUser] = useState<UserModel | null>(null)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(inputValue == lastInputValue)
      return
      
    setLastInputValue(inputValue)
    let u = await getGithubUsers(inputValue)
    if(u)
      setUser(new UserModel(u))

  }

  return (<>
    <form className="search-bar" onSubmit={async (e: FormEvent<HTMLFormElement>) => await handleSubmit(e)}>
      <div style={{marginBottom: "10px"}}>Welcome to GitHub User Search. Type a GitHub user's username.</div>
      <input
        type="text"
        placeholder="Enter a username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>


    <Router>
      <div className='row'>
        <Link to="/">User</Link>
        <Link to="/repos">Repositories</Link>
        <Link to="/followers">Followers</Link>
      </div>
      <Routes>
        <Route path="/" element={<UserPage userProp={user} />} />
        <Route path="/repos" element={<ReposPage userProp={user} />} />
        <Route path="/followers" element={<FollowersPage userProp={user} />} />
      </Routes>
    </Router>
    
    
  </>);
}

export default App;
