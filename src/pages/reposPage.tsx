import { useEffect, useState } from 'react';
import '../styles/general.scss';
import { getGithubUserRepos } from '../api/userApi';
import { IRepos, ReposModel } from '../model/repoModel';
import { UserModel } from '../model/userModel';

interface Props {
  userProp?: UserModel | null
}

export default function ReposPage({userProp}: Props) {
  
  const [user, setUser] = useState<UserModel | null>(null)
  const [repos, setRepos] = useState<ReposModel[]>([])
  
  // Implementing pagination
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (userProp !== user){
        setRepos([])
        setHasMore(true)
      }

      if (userProp && hasMore){
        const reposList = await getGithubUserRepos(userProp.login || '', page)
        if (reposList && reposList.length > 0){
          reposList.forEach((repo: IRepos) => { new ReposModel(repo) })
          setRepos((prevRepos) => [...prevRepos, ...reposList])
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
    console.log(sortedRepos)
    setRepos(sortedRepos)
  }

  return (
    <div>
      {repos && user ? 
        <div>
          <div className='heading center'>{user.login}'s Repositories</div>
          <div className='row'>
            <button className='button' onClick={() => sortRepos('asc')}>Sort by Stars Ascending</button>
            <button className='button' onClick={() => sortRepos('desc')}>Sort by Stars Descending</button>
          </div>
          <div>
            {repos.map((repo) => (
              <div className='column container' key={repo.id}>
                <div className='title'>{repo.name} <span>⭐{repo.stargazers_count}</span></div>
                <span>{repo.description}</span>
                {repo.html_url &&
                  <button onClick={() => repo.html_url && window.open(repo.html_url, '_blank')}>Visit repository</button>
                }
                
              </div>
            ))}
          </div>
          {hasMore ?
            <div className='row'>
              <button onClick={() => loadMore()}>Load More</button>
            </div>
          :
            <div className='row'>
              No more repositories to load.
            </div>
          }
        </div>
      : <div>Search a user and their repositories will appear here.</div>
     }
    </div>
  )
}
