
export interface IUserImage {
  id: string,
  url: string,
  width: string,
  height: string
}

export interface IUser {
  cover?: IUserImage | undefined,
  description?: string,
  email?: string,
  image?: IUserImage | undefined,
  name?: string,
  slug?: string,
}

export interface IRegistration {
  email: string, 
  name: string, 
  password: string
}

export interface ILogin {
  email: string, 
  password: string
}