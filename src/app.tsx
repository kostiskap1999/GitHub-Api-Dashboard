import { FormEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserPage from './pages/userPage';
import FollowersPage from './pages/followersPage';
import { UserModel } from './model/userModel';
import { getGithubUsers } from './api/userApi';
import ReposPage from './pages/reposPage';

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [user, setUser] = useState<UserModel | null>(null)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let search = await getGithubUsers(inputValue)
    if(search)
      setUser(new UserModel(search))
  }

  return (<>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">User</Link>
          </li>
          <li>
            <Link to="/repos">Repositories</Link>
          </li>
          <li>
            <Link to="/followers">Followers</Link>
          </li>
        </ul>
      </nav>

      <div className="App">
      <form onSubmit={async (e: FormEvent<HTMLFormElement>) => await handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter a username to show information"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
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
