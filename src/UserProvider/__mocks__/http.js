import { response } from "msw"

export default {
    get: async () => {
        return response.data = { username: "Anthony Finix" }
    }
}