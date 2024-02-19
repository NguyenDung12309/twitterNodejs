export class reqAuthRegister {
  name: string
  email: string
  dateOfBirth: Date
  password: string
  confirmPassword: string
}

export class reqAuthLogin {
  email: string
  password: string
}

export class reqAuthLogout {
  refreshToken: string
}
