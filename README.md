# Details Summary TipTap Extension

## Usage (Vue.js):
### 1. Import extension
```js
import DetailsSummary from 'details-summary-tiptap-extension'
```

### 2. Add extension to your TipTap Editor
```js
extensions: [
    // ...
    DetailsSummary,
]
```

### 3. Create new button
```html
<div v-if="editor">
    <button @click="editor.commands.toggleDetails()">
        toggleDetails
    </button>
</div>
<editor-content :editor="editor" />
```
