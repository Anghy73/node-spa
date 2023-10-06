import pages from '../views/index.js'

let content = document.querySelector('#app')

const router = async (route) => {
  content.innerHTML = ''
  switch (route) {
    case '':
      return content.innerHTML = pages.home()
    case '#home':
      return content.innerHTML = pages.home()
    case '#about':
      return content.innerHTML = pages.about()
    case '#contact':
      return content.innerHTML = pages.contact()
    default:
      return content.innerHTML = pages.notFound()
  }
}

export {router}