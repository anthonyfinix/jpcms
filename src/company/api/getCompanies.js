import http from '../../util/axios';
const getCompanies = async ({ page, limit, skip } = {}) => {
    try {
        let options = { params: {} };
        if (page) options.params.page = page;
        if (limit) options.params.limit = limit;
        if (skip) options.params.skip = skip;
        return await http.get('/company', options)
    } catch (e) {
        return { error: e.message }
    }
}

export default getCompanies;