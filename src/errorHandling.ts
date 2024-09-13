export function errorHandling(error: Error) {
    if (error.message === '401')
        alert('API token expired.')
    if (error.message === '403')
        alert('Too many unauthorized API requests. Try refreshing your token.')
    else if (error.message === '429')
        alert('Too many API requests. Try again later.')
    else if(error.message === '404')
        alert('User not found.')
    else
        console.error(error)
}