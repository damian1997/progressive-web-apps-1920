import fs from 'fs'
import {getCommits} from '../src/scripts/api'
import {cleanGithubData, sortCommits} from '../src/scripts/data'

export default async function(req,res,COMPONENTPATH,BUNDLE,COMMITS) {
  res.render(`${COMPONENTPATH}/base/views/home`, {
    title: 'Overview',
    bundledCSS: BUNDLE['main.css'],
    bundledJS: BUNDLE['main.js'],
    serviceWorker: BUNDLE['service-worker.js'],
    forkers: COMMITS
  })
}
