const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    get,
    remove,
    save,
    getEmptyBug,
   getDefaultFilter,
}

function query(filterBy = {}) {

    return axios.get(BASE_URL).then(res => res.data)
}

function get(bugId) { 
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove').then(res => res.data)
}

function save(bug) {
    const url = BASE_URL + 'save'
    let queryParams = `?title=${bug.title}&severity=${bug.severity}&description=&1${bug.description}`
    if (bug._id) queryParams += `&_id=${bug._id}`
    return axios.get(url + queryParams).then(res => res.data)

}
function getDefaultFilter() {
    return { text: '', minSeverity: '' }
}

function getEmptyBug(title = '', severity = 0, description='') {
    return { title,severity,_id: "",description}
}


// function getById(bugId) {
//     const bug = bugs.find((bug) => bug._id === bugId)
//     if (!bug) return Promise.reject(`no such bug with this id ${bugId}`)
//     return Promise.resolve(bug)
// }
