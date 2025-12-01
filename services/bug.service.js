import fs from 'fs'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const bugsFile = 'data/bugs.json'
let bugs = utilService.readJsonFile(bugsFile)
console.log('bugs: ', bugs)

export const bugService = {
    query,
    getById,
    add,
    update,
    remove,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return Promise.resolve(bugs)
    //  .then(bugs => {

    //      if (filterBy.text) {
    //          const regExp = new RegExp(filterBy.text, 'i')
    //          bugs = bugs.filter(bug => regExp.test(bug.title))
    //      }

    //      if (filterBy.minSeverity) {
    //          bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
    //      }

    //      return bugs
    //  })
}

function getById(bugId) {
    const bug = bugs.find((bug) => bug._id === bugId)
    if (!bug) return Promise.reject(`no such bug with this id ${bugId}`)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = bugs.findIndex((bug) => bug._id === bugId)
    if (idx === -1) return Promise.reject(`no such bug with this id ${bugId}`)
    bugs.splice(idx, 1)
    return _saveBugs()
}

function add(bug) {
    const bugToSave = {
        _id: utilService.makeId(),
        title: bug.title,
        severity: bug.severity,
        description: bug.description,
    }
    bugs.push(bugToSave)
    return _saveBugs().then(() => bugToSave)
}

function update(bug) {
    const bugToUpdate = bugs.find((currBug) => currBug._id === bug._id)
    if (!bugToUpdate) return Promise.reject(`No such bug ${bug._id}`)
    bugToUpdate.title = bug.title
    bugToUpdate.severity = bug.severity
    bugToUpdate.description = bug.description

    return _saveBugs().then(() => bugToUpdate)
}

function getDefaultFilter() {
    return { text: '', minSeverity: 0 }
}

function _saveBugs() {
    return new Promise((resolve, reject) => {
        const strBugs = JSON.stringify(bugs, null, 2)
        fs.writeFile(bugsFile, strBugs, (err) => {
            if (err) return reject('Cannot update bugs file')
            resolve()
        })
    })
}
