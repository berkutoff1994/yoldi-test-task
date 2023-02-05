import { ILogin, IRegistration, IUser } from "@/types"
import axios from "axios"

export const fetcher = async(url: string, init?: RequestInit) => await fetch(url, init).then(res => res.json())

export const Registration = (body: IRegistration, mutate: any) => {
  const url = 'https://frontend-test-api.yoldi.agency/api/auth/sign-up'
  mutate(url, fetcher(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    }
  ))
}

export const Login = async(body: ILogin, mutate: any) => {
  const url = 'https://frontend-test-api.yoldi.agency/api/auth/login'
    return await mutate(url, fetcher(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    }
  ))
}

export const GetMyProfile = async(token: string) => {
  const url = 'https://frontend-test-api.yoldi.agency/api/profile'
  if(token) {
    return await axios.get(url, {
      headers: {
        "X-API-KEY": token
        },
      }
    ).then(res => res.data)
  }
}

export const ChangeMyProfile = async(body: IUser, mutate: any, token: string | null) => {
  const url = 'https://frontend-test-api.yoldi.agency/api/profile'
  return await await mutate(url, axios.patch(url, body, {
    headers: {
      'Content-type': 'application/json',
      "X-API-KEY": token ? token : ''
    },
  }))
}

export const ChangeMyAvatar = async(body: any, mutate: any) => {
  const url = 'https://frontend-test-api.yoldi.agency/api/image'
  return await await mutate(url, axios.post(url, body))
}

export const GetMyAvatar = async(token: string | null, id: string) => {
  const url = `https://frontend-test-api.yoldi.agency/api/image/${id}`
  return await axios.get(url, {
    headers: {
      "X-API-KEY": token ? token : ''
      },
    }
  ).then(res => res.data)
}