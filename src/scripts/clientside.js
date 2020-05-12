function init() {
  const overview_card_headers = document.querySelectorAll('.forker--overview--card-header')

  overview_card_headers.forEach(header => {
    header.addEventListener('click', event => {
      const commits_container = event.target.nextElementSibling
      if(commits_container.classList.contains('hide')) {
        commits_container.classList.remove('hide')
      } else {
        commits_container.classList.add('hide')
      }
    })
  })
}

init()
