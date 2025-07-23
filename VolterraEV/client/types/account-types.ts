export type User = {
    username: string,
    password: string,
}
export type ActionResponse = {
    success: boolean,
    message?: string,
    error?: {[K in keyof User]?: string[]}
}