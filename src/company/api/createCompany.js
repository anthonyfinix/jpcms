import http from '../../util/axios';
const createCompany = async (name, password) => {
    try {
        const response = await http.post('/company', { name, password })
        if (response.data.error) return { error: response.data.error }
        return response.data;
    } catch (e) {
        return { error: e.message }
    }
}

export default createCompany;