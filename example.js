const feedbackElement = require('./index.js')

document.body.appendChild(feedbackElement({
  onSubmit: console.log
}))

document.body.appendChild(feedbackElement({
  onSubmit: console.log
}))