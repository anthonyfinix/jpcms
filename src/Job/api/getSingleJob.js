import http from '../../util/axios';
const getSingleJob = async (company, jobId) => {
    try {
        let options = { params: { company: company.name } };
        return await http.get(`/service/${jobId}`, options)
    } catch (e) {
        return { error: e.message }
    }
}

export default getSingleJob;