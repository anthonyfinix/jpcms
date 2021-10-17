import http from '../../util/axios';
const getCompanyById = async (id) => {
    try {
        let { data } = await http.get(`/company/${id}`);
        if (data.error) return { error: data.error }
        return data;
    } catch (e) {
        return { error: e.message }
    }
}

export default getCompanyById;