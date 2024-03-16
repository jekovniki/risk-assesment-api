
export {}

declare global {
    namespace Express {
        export interface Request {
            userSession: {
                userId: string
            }
        }
    }
}