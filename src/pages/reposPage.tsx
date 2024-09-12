import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUserRepos } from '../api/userApi';
import { IRepos, ReposModel } from '../model/repoModel';
import { UserModel } from '../model/userModel';

interface Props {
  search: string
}

export default function ReposPage({search}: Props) {
  
  const [owner, setOwner] = useState<UserModel | null>(null)
  const [repos, setRepos] = useState<ReposModel[] | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if(search){
        let reposList = await getGithubUserRepos(search)
        reposList.forEach((repo: IRepos) => {
          new ReposModel(repo)
        })
      
        setRepos(reposList)
        console.log(reposList[0].owner)
        setOwner(reposList[0].owner)
      }
        
    }
    loadData()
  }, [search])


  const sortRepos = (order: 'asc' | 'desc') => {
    if(!repos)
      return

    const sortedRepos = [ ...repos].sort((a, b) => {
      const countA = a.stargazers_count ?? 0
      const countB = b.stargazers_count ?? 0
      if (order === 'asc') {
        return countA - countB
      } else {
        return countB - countA
      }
    })
    setRepos(sortedRepos)
  }

  return (
    <div className="App">
      {repos && owner ? 
        <div>
          <h1>{owner.login}'s Repositories</h1>
          <button onClick={() => sortRepos('asc')}>
            Sort by Stars Ascending
          </button>
          <button onClick={() => sortRepos('desc')}>
            Sort by Stars Descending
          </button>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <p>⭐ {repo.stargazers_count}</p>
              </li>
            ))}
          </ul>
        </div>
      : <div>Search a user and their repositories will appear here.</div>
     }
    </div>
  )
}
