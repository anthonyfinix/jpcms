import http from '../../util/axios';
const getSearchedJobs = async (company,query) => {
    try {
        return await http.get(`/service/search?company=${company.name}`, { params: { q: query } })
    } catch (e) {
        return { error: e }
    }
}
export default getSearchedJobs;