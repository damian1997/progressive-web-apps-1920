import { getForkers, getCommits, getIssues } from './src/scripts/api'
import { cleanGithubData, sortCommits } from './src/scripts/data'
import express from 'express'
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'src/components/base/views')

app.use(express.static('src/styles'))

app.get('/', (req, res) => {
  res.render('home', {
  })
})

app.get('/overview', async (req, res) => {
  const apiBaseUrl = 'https://api.github.com/repos'
  const split_string = req.query.repository.split('https://github.com/')	
  const finalstring = split_string[1].split('/')
  const fetchUrl = `${apiBaseUrl}/${finalstring[0]}/${finalstring[1]}`

  const forkers = await getForkers(apiBaseUrl,finalstring[0],finalstring[1])
  .then(async (entrys) => {
  return await getCommits(apiBaseUrl,entrys)
  })

  const cleanedForkers = await cleanGithubData(forkers)
  .then(async (entrys) => {
  return await sortCommits(entrys)
  })

  console.log(cleanedForkers[0].commits.commits)
  res.render(`${__dirname}/src/components/overview/views/overview`, {
    title: 'Home',
    basePartialsPath: `${__dirname}/src/components/base/views/partials`,
    forkers: cleanedForkers
  })
})

app.listen(3000, () => {
  console.log('App has booted on port 3000')
})
