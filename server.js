import { getForkers, getCommits, getIssues } from './src/scripts/api'
import { cleanGithubData, sortCommits } from './src/scripts/data'
import fs from 'fs'

import express from 'express'
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'src/components/base/views')

app.use(express.static('static'))

app.get('/', (req, res) => {
  // TODO REFACTOR THE BUNDLE FILENAMES
  const BUNDLEFILENAMES = getBundleUrls()
  res.render('home', {
    bundledcss: BUNDLEFILENAMES['main.css']
  })
})

app.get('/overview', async (req, res) => {
  // TODO REFACTOR THE BUNDLE FILENAMES
  const BUNDLEFILENAMES = getBundleUrls()

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

  res.render(`${__dirname}/src/components/overview/views/overview`, {
    title: 'Overview',
    basePartialsPath: `${__dirname}/src/components/base/views/partials`,
    bundledcss: BUNDLEFILENAMES['main.css'],
    forkers: cleanedForkers
  })
})

app.get('/detail/:id', (req, res) => {
  // TODO REFACTOR THE BUNDLE FILENAMES
  const BUNDLEFILENAMES = getBundleUrls()

  res.render(`${__dirname}/src/components/detail/views/detail`, {
   title: 'Detail',
    basePartialsPath: `${__dirname}/src/components/base/views/partials`,
    bundledcss: BUNDLEFILENAMES['main.css']
  })
})

app.get('/detail', (req, res) => {
  console.log('  Heeey')
})

app.get('/offline', (req, res) => {
  // TODO REFACTOR THE BUNDLE FILENAMES
  const BUNDLEFILENAMES = getBundleUrls()

  res.render('offline', {
    basePartialsPath: `${__dirname}/src/components/base/views/partials`,
    bundledcss: BUNDLEFILENAMES['main.css']
  })
})

app.listen(PORT, () => {
  console.log(`App has booted on port ${PORT}`)
})

function getBundleUrls() {
  const BUNDLEFILENAMES = JSON.parse(fs.readFileSync(`static/bundle/manifest.json`))
  return BUNDLEFILENAMES
}
