import http from '../../util/axios';
const deleteJob = async (company,id) => {
    try {
        return await http.delete(`/service/${id}?company=${company.name}`)
    } catch (e) {
        return { error: e.message }
    }
}

export default deleteJob;