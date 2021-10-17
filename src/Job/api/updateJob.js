import http from '../../util/axios';
const updateJob = async (company,data) => {
    try {
        return await http.put(`/service?company=${company.name}`, data)
    } catch (e) {
        return { error: e.message }
    }
}

export default updateJob;