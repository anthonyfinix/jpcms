import http from '../../util/axios';
const addJob = async (company,data) => {
    try {
        return await http.post(`/service?company=${company.name}`, data)
    } catch (e) {
        return { error: e.message }
    }
}

export default addJob;