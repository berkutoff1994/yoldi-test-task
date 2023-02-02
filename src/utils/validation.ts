//валидация имени
export const ValidationName: (arg: string) => [boolean, string] = (name) => {
  if(name.length < 2) return [false, 'Длина имени не может быть короче двух символов']
  if(name.length > 1 && !/[a-zа-яё]/i.test(name)) {
    return [false, 'Имя должно содержать только буквы']
  }
  else return [true, '']
}

//валидация email
export const ValidationEmail: (arg: string) => boolean = (email) => {
  const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  if(!EMAIL_REGEXP.test(email)) {
    return false
  }
  return true
}

//валидация пароля
export const ValidationPassword: (arg: string) => boolean = (password) => {
  if(password.length < 6) return false
  else return true
}