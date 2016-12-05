const yo = require('yo-yo')

const noop = () => {}
const usePlain = '\ufE0E'
const smile = '\u263A' + usePlain
const frown = '\u2639' + usePlain
const arrow = '\u2192' + usePlain

module.exports = feedback

function feedback({
  onSubmit = noop,
  expanded = false,
  smiling = false,
  frowning = false,
  text = '',
  toUpdate,
} = {}) {
  const submit = () => {
    onSubmit({ smiling, frowning, text })
    yo.update(toUpdate, feedback({
      onSubmit,
      toUpdate
    }))
  }

  const update = (options) => yo.update(
    toUpdate,
    feedback(Object.assign(arguments[0], { toUpdate }, options))
  )

  const smileClick = () => update({
    expanded: expanded ? frowning : !smiling,
    smiling: !smiling,
    frowning: false,
  })

  const frownClick = () => update({
    expanded: expanded ? smiling : !frowning,
    smiling: false,
    frowning: !frowning,
  })

  const handleTextInput = e => update({
    text: e.target.value,
  })

  let el = yo`
  <div style=${`cursor: default;`}>
    <span style="${`
      font-size: 30pt;
      font-family: "Arial Unicode MS", Times, serif;
      user-select: none;
    `}">
      <span 
        style=${`
          color: ${smiling ? 'green' : 'black'};
          font-weight: ${smiling ? 'bold' : 'normal'};
          cursor: pointer;
        `}
        onclick=${smileClick}
      >${smile}</span>
      <span 
        style=${`
          color: ${frowning ? 'DarkRed' : 'black'};
          font-weight: ${frowning ? 'bold' : 'normal'};
          cursor: pointer;
        `}
        onclick=${frownClick}
      >${frown}</span>
      ${
      expanded
      ? yo`<span 
        onclick=${submit}
        style=${`cursor: pointer;`}
      >${arrow}</span>`
      : ''
      }
    </span>
    ${
    expanded
    ? yo`<div><textarea 
      autofocus=true
      oninput=${handleTextInput}
      onkeydown=${e => {
        e.keyCode == 13 && e.metaKey && submit()
      }}
      rows=6
      style=${`resize: none;`}
    >${text}</textarea></div>`
    : ''
    }
  </div>
  `

  toUpdate = toUpdate || el
  return el
}
