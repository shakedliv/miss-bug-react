import express from 'express'
import cookieParser from 'cookie-parser'
import { bugService } from './services/bug.service.js'
import{loggerService} from './services/logger.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())



// app.get('/', (req, res) => res.send('Hello there'))
 
app.get('/api/bug', (req, res) => {
   bugService.query().then(bugs => {
      res.json(bugs)
   })
      .catch(err => {
         // loggerService.error('ERROR - cannot get bugs:', err)
         res.status(400).send('Can not get bugs',err)
   })
})
app.get('/api/bug/save', (req, res) => {
   const bug = {
        _id: req.query._id,
        title: req.query.title,
        description: req.query.description,
        severity: +req.query.severity
   }
    const func = (bug._id) ? 'update' : 'add'
   bugService[func](bug).then(savedBug => {
      res.json(savedBug)
   })
      .catch(err => {
         // loggerService.error('ERROR - cannot save bug:', err)
         res.status(400).send('Can not save bug',err)
   })
})
app.get('/api/bug/:bugId', (req, res) => {
   const { bugId } = req.params
   console.log('bugId:', bugId)
    var visitedBugs = req.cookies.visitedBugs || []
    visitedBugs.push(bugId)
   res.cookie('visitedBugs', visitedBugs, {maxAge: 7000})
   console.log('user visited :', visitedBugs)
   if(visitedBugs.length > 3) return res.status(401).send('Wait for a bit')

   bugService.getById(bugId).then(bug => {
      res.json(bug)
   })
      .catch(err => {
         // loggerService.error('ERROR - cannot get bug:', err)
         res.status(400).send('Can not get bug',err)
   })
})
app.get('/api/bug/:bugId/remove', (req, res) => {
   const {bugId} = req.params
   bugService.remove(bugId).then(bug => {
      res.send('BUg removed')
   })
      .catch(err => {
         // loggerService.error('ERROR - cannot remove bugs:', err)
         res.status(400).send('Can not remove bugs',err)
   })
})

app.listen(3031, () => console.log('Server ready at port 3031'))
