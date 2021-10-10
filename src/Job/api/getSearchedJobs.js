import http from '../../util/axios';
const getSearchedJobs = async (query) => {
    try {
        return await http.get("/service/search", { params: { q: query } })
    } catch (e) {
        return { error: e }
    }
}
export default getSearchedJobs;