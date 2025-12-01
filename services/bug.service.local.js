import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bugs'

_createBugs()
const bugsFile = 'data/bugs.json'
const bugs = utilService.readJsonFile(bugsFile)

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
   // return Promise.resolve(bugs)
   //  .then(bugs => {

   //      if (filterBy.txt) {
   //          const regExp = new RegExp(filterBy.txt, 'i')
   //          bugs = bugs.filter(bug => regExp.test(bug.title))
   //      }

   //      if (filterBy.minSeverity) {
   //          bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
   //      }

   //      return bugs
   //  })
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
   // const bug = bugs.find(bug => bug._id === bugId)
   // if (!bug) return Promise.reject(`no such bug with this id ${bugId}`)
   // return Promise.resolve(bug)
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
   // const idx = bugs.findIndex(bug => bug._id === bugId)
   // if (!idx) return Promise.reject(`no such bug with this id ${bugId}`)
   // bugs.splice(idx, 1)
   // _saveBugs()
}

function save(bug) {
    if (bug._id) {
         return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (bugs && bugs.length > 0) return 

    bugs = [
        {
            title: "Infinite Loop Detected",
            severity: 4,
            _id: "1NF1N1T3"
        },
        {
            title: "Keyboard Not Found",
            severity: 3,
            _id: "K3YB0RD"
        },
        {
            title: "404 Coffee Not Found",
            severity: 2,
            _id: "C0FF33"
        },
        {
            title: "Unexpected Response",
            severity: 1,
            _id: "G0053"
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, bugs)
}

function getDefaultFilter() {
    return { text: '', minSeverity: 0 }
}

// function _saveBugs() {
//     return new Promise((resolve, reject)=>{
//         const strBugs = JSON.stringify(bugs, null, 2)
//         fs.writeFile(bugsFile, strBugs, (err)=>{
//             if (err) return reject('Cannot update bugs file')
//             resolve()    
//         })
//     })
// }

