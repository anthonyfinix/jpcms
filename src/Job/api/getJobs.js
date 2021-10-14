import http from '../../util/axios';
const getJobs = async ({ page, limit, skip } = {}) => {
    try {
        let options = { params: {} };
        if (page) options.params.page = page;
        if (limit) options.params.limit = limit;
        if (skip) options.params.skip = skip;
        return await http.get('/service', options)
    } catch (e) {
        return { error: e.message }
    }
}

export default getJobs;