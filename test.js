const test = require('tape')
const feedback = require('./index.js')

test('create without throwing', t => {
  t.doesNotThrow(feedback)
  t.end()
})

test('click a face', t => {
  let f = feedback()
  let face = f.querySelector('span span')

  t.equal(
    face.innerHTML,
    '☺︎',
    'is a face'
  )

  t.equal(
    typeof face.click,
    'function',
    'face is clickable'
  )

  t.end()
})