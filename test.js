const test = require('tape')
const feedback = require('./index.js')

test('create without throwing', t => {
  t.doesNotThrow(feedback)
  t.end()
})

test('click faces', t => {
  let f = feedback()
  let smile = f.querySelector('span span')
  let frown = smile.nextElementSibling

  t.equal(
    smile.innerHTML,
    '☺︎',
    'is a smile'
  )

  t.notOk(
    f.querySelector('textarea'),
    'no textarea to start with'
  )

  smile.click()

  t.ok(
    f.querySelector('textarea'),
    'textarea after clicking smile'
  )

  smile.click()

  t.notOk(
    f.querySelector('textarea'),
    'no textarea after clicking smile again'
  )

  frown.click()

  t.ok(
    f.querySelector('textarea'),
    'textarea after clicking frown'
  )

  smile.click()

  t.ok(
    f.querySelector('textarea'),
    'textarea remains when switching from face to face'
  )

  t.end()
})

test('type things', t => {
  let f = feedback()
  let smile = f.querySelector('span span')
  let frown = smile.nextElementSibling
  let text = 'words'
  let textarea

  smile.click()
  textarea = f.querySelector('textarea')

  t.equal(
    textarea.value,
    '',
    'textarea starts empty'
  )

  t.ok(
    textarea.autofocus,
    'textarea is autofocused'
  )

  textarea.value = text
  textarea.dispatchEvent(new Event('input'))

  t.equal(
    f.querySelector('textarea').innerHTML,
    text,
    'text is added to textarea innerHTML'
  )

  smile.click()
  smile.click()

  t.equal(
    f.querySelector('textarea').innerHTML,
    text,
    'textarea value survives closing/opening'
  )

  frown.click()

  t.equal(
    f.querySelector('textarea').innerHTML,
    text,
    'text survives face changes'
  )

  t.end()
})

test('submit without text', t => {
  let f = feedback({
    onSubmit: ({ smiling, frowning, text }) => {
      t.equal(smiling, true)
      t.equal(frowning, false)
      t.equal(text, '')
      t.end()
    }
  })
  let smile = f.querySelector('span span')
  let submit

  smile.click()
  submit = smile.nextElementSibling.nextElementSibling
  submit.click()
})

test('submit with text', t => {
  let input = 'cool'
  let f = feedback({
    onSubmit: ({ smiling, frowning, text }) => {
      t.equal(smiling, true)
      t.equal(frowning, false)
      t.equal(text, input)
      t.end()
    }
  })
  let smile = f.querySelector('span span')
  let textarea
  let submit

  smile.click()
  textarea = f.querySelector('textarea')
  submit = smile.nextElementSibling.nextElementSibling
  textarea.value = input
  textarea.dispatchEvent(new Event('input'))
  submit.click()
})