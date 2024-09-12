import React, { FormEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserPage from './pages/userPage';
import FollowersPage from './pages/followersPage';
import { UserModel } from './model/userModel';
import { getGithubUsers } from './api/userApi';
import ReposPage from './pages/reposPage';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
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
      <form onSubmit={handleSubmit}>
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
        <Route path="/" element={<UserPage search={search} />} />
        <Route path="/repos" element={<ReposPage search={search} />} />
        <Route path="/followers" element={<FollowersPage search={search} />} />
      </Routes>
    </Router>
    
    
  </>);
}

export default App;
