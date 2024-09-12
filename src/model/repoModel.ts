import { UserModel } from "./userModel"

export interface IRepos {
    id: number | null,
    name: string | null,
    owner: UserModel | null,
    description: string | null,
    stargazers_count: number | null
}

export class ReposModel implements IRepos {
    id: number | null
    name: string | null
    owner: UserModel | null
    description: string | null
    stargazers_count: number | null

    constructor(repo: IRepos = {} as IRepos) {
        this.id = repo.id
        this.name = repo.name
        this.owner = repo.owner
        this.description = repo.description
        this.stargazers_count = repo.stargazers_count
    }
}
