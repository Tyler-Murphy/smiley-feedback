### Install

```
npm install --save smiley-feedback
```

### Use

```js
feedback = require('smiley-feedback')

document.body.appendChild(feedback({
  onSubmit: ({ smiling, frowning, text }) => {
  	// do something with the user's feedback
  }
}))
```

A standalone version is also included in `dist/`:

```html
<script src="node_modules/smiley-feedback/dist/index.js"></script>
<script>
  document.body.appendChild(feedback())
</script> 
```
