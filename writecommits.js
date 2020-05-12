import fs from 'fs'
import { getCommits } from './src/scripts/api'
import { cleanGithubData, sortCommits } from './src/scripts/data'


async function init() {
  const FORKERS = fs.readFileSync('./data/forkers.json'),
    APIBASEURL = 'https://api.github.com/repos',
    GITUSER = 'cmda-minor-web',
    REPONAME = 'progressive-web-apps-1920',
    FETCHURL = `${APIBASEURL}/${GITUSER}/${REPONAME}`

  const forkerCommits = await getCommits(APIBASEURL, JSON.parse(FORKERS))

  const cleanedForkers = await cleanGithubData(forkerCommits)
    .then(async (entrys) => {
      return await sortCommits(entrys)
    })

  writeForkers(JSON.stringify(cleanedForkers,null,2))
}

function writeForkers(cleanedForkers) {
  fs.writeFileSync(`${__dirname}/data/forkersandcommits.json`, cleanedForkers, {
    flag: 'w'
  })
}

init()
