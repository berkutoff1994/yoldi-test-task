
export interface IUserImage {
  id: string,
  url: string,
  width: string,
  height: string
}

export interface IUser {
  cover: IUserImage | undefined,
  description: string,
  email: string,
  image: IUserImage | undefined,
  name: string,
  slug: string,
}