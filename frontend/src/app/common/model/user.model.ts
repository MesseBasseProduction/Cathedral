export type UserDetail = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    active: boolean
    staff: boolean
    lastLogin: Date | null
    dateJoined: Date
}

export type UserRegistration = {
    email: string
    username: string
    password: string
    confirmPassword: string
}

export type UserActivation = {
    uidb64: string
    token: string
}

export type UserCredentials = {
    email: string
    password: string
}
