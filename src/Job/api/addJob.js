import http from '../../util/axios';
const addJob = async (data) => {
    try {
        return await http.post('/service', data)
    } catch (e) {
        return { error: e.message }
    }
}

export default addJob;