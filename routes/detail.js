import fetch from 'node-fetch'

export default async function(req,res,COMPONENTPATH,BUNDLE) {
  const split_url = req.params.id.split('&'),
    APIBASEURL = 'https://api.github.com/repos'

  const commit = await fetch(`${APIBASEURL}/${split_url[0]}/${split_url[1]}/commits/${split_url[2]}`)
    .then(res => {
      return res.json()
    })
  
  const patches = commit.files.map(file => {
    const file_patch = new Object()
    file_patch.sha = file.sha
    file_patch.filename = file.filename
    file_patch.additions = file.additions
    file_patch.deletions = file.deletions
    file_patch.changes = file.changes
    file_patch.patch = file.patch.split(/\r?\n/)

    return file_patch
  })

  res.render(`${COMPONENTPATH}/detail/views/detail`, {
    BASEPARTIALPATH: `${COMPONENTPATH}/base/views/partials`,
    bundledCSS: BUNDLE['main.css'],
    bundledJS: BUNDLE['main.js'],
    serviceWorker: BUNDLE['service-worker.js'],
    commitData: commit,
    filePatches: patches
  })
}
