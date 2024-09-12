export async function getGithubUsers(username: string) {
    return await fetch(`https://api.github.com/users/${username}`,
        {
            method: 'GET',
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`
            }
        })
    .then((response) => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .catch((error) => {
        console.error(error)
    })
}