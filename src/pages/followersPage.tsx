import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUserFollowers } from '../api/userApi';
import { FollowersModel } from '../model/followersModel';

interface Props {
  search: string
}

export default function ReposPage({search}: Props) {
  
  const [repos, setRepos] = useState<FollowersModel | null>(null)

  useEffect(() => {
    const loadData = async () => {
      search &&
        setRepos(new FollowersModel(await getGithubUserFollowers(search)))
    }
    loadData()
  }, [search])

  return (
    <div className="App">

      {repos ? 
        <div className="row">
          <div>
            <span>Username</span>
            <span>{repos.login}</span>
          </div>
          <div>
            <span>Name</span>
            <span>{repos.name}</span>
          </div>
          <div>
            <span>Avatar URL</span>
            <span><img src={repos.avatar_url ? repos.avatar_url : ""}  alt="User Avatar" style={{maxHeight: '100px', maxWidth: '100px'}} /></span>
          </div>
          <div>
            <span>Location</span>
            <span>{repos.location}</span>
          </div>
          <div>
            <span>Bio</span>
            <span>{repos.bio}</span>
          </div>
          <div>
            <span>Number of Followers</span>
            <span>{repos.followers}</span>
          </div>
          <div>
            <span>Public Repos</span>
            <span>{repos.public_repos}</span>
          </div>

        </div>
    : <div>Search a user and their repositories will appear here.</div>
    }
    </div>
  )
}
