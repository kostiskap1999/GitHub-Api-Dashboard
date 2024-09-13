import { errorHandling } from "../errorHandling"

export async function getGithubUsers(username: string) {
    const headers: HeadersInit = {}

    if (process.env.REACT_APP_TOKEN)
        headers.Authorization = `token ${process.env.REACT_APP_TOKEN}`

    return await fetch(`https://api.github.com/users/${username}`,
        {
            method: 'GET',
            headers
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
    })
    .catch(errorHandling)
}

export async function getGithubUserRepos(username: string, page: number = 1) {
    const headers: HeadersInit = {}

    if (process.env.REACT_APP_TOKEN)
        headers.Authorization = `token ${process.env.REACT_APP_TOKEN}`

    return await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=30`,
        {
            method: 'GET',
            headers
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
    })
    .catch(errorHandling)
}

export async function getGithubUserFollowers(username: string, page: number = 1) {
    const headers: HeadersInit = {}

    if (process.env.REACT_APP_TOKEN)
        headers.Authorization = `token ${process.env.REACT_APP_TOKEN}`

    return await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=30`,
        {
            method: 'GET',
            headers
        })
    .then((response) => {
        if(response.ok)
            return response.json()
        else
            throw new Error(JSON.stringify(response.status))
            
    })
    .catch(errorHandling)
}