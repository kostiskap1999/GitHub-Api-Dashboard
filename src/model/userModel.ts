export interface IUser {
    login: string | null,
    id: number | null,
    name: string | null,
    avatar_url: string | null,
    location: string | null,
    bio: string | null,
    public_repos: number | null
    followers: number | null
}

export class UserModel implements IUser {
    login: string | null
    id: number | null
    name: string | null
    avatar_url: string | null
    location: string | null
    bio: string | null
    public_repos: number | null
    followers: number | null

    constructor(user: IUser = {} as IUser) {
        this.login = user.login
        this.id = user.id
        this.name = user.name
        this.avatar_url = user.avatar_url
        this.location = user.location
        this.bio = user.bio
        this.public_repos = user.public_repos
        this.followers = user.followers
    }
}
