import Heading from '@tiptap/extension-heading'

export default Heading.extend({
	addCommands() {
		return {
			setHeading: attributes => ({ commands, chain }) => {
				if (!this.options.levels.includes(attributes.level)) {
					return false
				}

				const selection = this.editor.state.selection.$to;
				if (selection.parent.type.name === 'summary') {
					return commands.updateAttributes('summary', {class: 'h' + attributes.level})
				} else {
					return commands.setNode(this.name, attributes)
				}
			},
			toggleHeading: attributes => ({ commands, chain }) => {
				if (!this.options.levels.includes(attributes.level)) {
					return false
				}

				const selection = this.editor.state.selection.$to;
				if (selection.parent.type.name === 'summary') {
					let currHeading = selection.parent.attrs.class;
					let currLevel = currHeading ? currHeading[1] : null;
					let setLevel = attributes.level;
					let level = (currLevel == setLevel) ? null : setLevel;

					return commands.updateAttributes('summary', {class: 'h' + level})
				} else {
					return commands.toggleNode(this.name, 'paragraph', attributes)
				}
			},
		}
	}
})