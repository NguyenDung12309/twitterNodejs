export class reqUserRegister {
  name: string
  email: string
  dateOfBirth: Date
  password: string
  confirmPassword: string
}

export class reqUserLogin {
  email: string
  password: string
}
