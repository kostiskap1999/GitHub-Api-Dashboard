import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUsers } from '../api/userApi';
import { UserModel } from '../model/userModel';

interface UserPageProps {
  search: string
}

export default function ReposPage({search}: UserPageProps) {
  const user = new UserModel()
  return (
    <div className="App">

      {user ? 
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
          <div>
            <span>Number of Followers</span>
            <span>{user.followers}</span>
          </div>
          <div>
            <span>Public Repos</span>
            <span>{user.public_repos}</span>
          </div>

        </div>
    : <div>Didn't search a user? Search a user and their info will appear here.</div>
    }
    </div>
  )
}
