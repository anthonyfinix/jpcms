import http from '../../util/axios';
const searchCompanies = async (query) => {
    try {
        let { data } = await http.get(`/company/search?q=${query}`);
        if (data.error) return { error: data.error }
        return data;
    } catch (e) {
        return { error: e.message }
    }
}

export default searchCompanies;