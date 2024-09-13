import { errorHandling } from "../errorHandling"

export async function getGithubUsers(username: string) {
    return await fetch(`https://api.github.com/users/${username}`,
        {
            method: 'GET',
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`
            }
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
    })
    .catch(errorHandling)
}

export async function getGithubUserRepos(username: string) {
    return await fetch(`https://api.github.com/users/${username}/repos`,
        {
            method: 'GET',
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`
            }
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
    })
    .catch(errorHandling)
}

export async function getGithubUserFollowers(username: string) {
    return await fetch(`https://api.github.com/users/${username}/followers`,
        {
            method: 'GET',
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`
            }
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
            
    })
    .catch(errorHandling)
}