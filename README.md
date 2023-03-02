# Details Summary TipTap Extension

## Usage (Vue.js):

### 1. Install extension
`npm install details-summary-tiptap-extension`

### 2. Import extension
```js
import DetailsSummary from 'details-summary-tiptap-extension'
```

### 3. Add extension to your TipTap Editor
```js
extensions: [
    // ...
    DetailsSummary,
]
```

### 4. Create new button
```html
<div v-if="editor">
    <button @click="editor.commands.toggleDetails()">
        toggleDetails
    </button>
</div>
<editor-content :editor="editor" />
```
