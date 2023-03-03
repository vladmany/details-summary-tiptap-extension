import { Extension } from '@tiptap/core'
import { Details, Summary } from "./DetailsSummaryNodes";
import HeadingExtender from "./HeadingExtender";
import styles from './style.css';

export default Extension.create({
	name: 'details_summary',

	addExtensions() {
		return [
			Details,
			Summary,
			HeadingExtender
		];
	},

	addGlobalAttributes() {
		return [
			{
				types: ['details'],
				attributes: {
					open: {
						default: false,
						renderHTML: attributes => {
							if (attributes.open) {
								return {
									open: true
								}
							}

							return {}
						},
						parseHTML: element => {
							if (element.hasAttribute('open')) {
								return {
									open: true
								}
							}
						}
					}
				}
			},
			{
				types: ['summary'],
				attributes: {
					class: {

					}
				}
			}
		]
	},

	addCommands() {
		return {
			toggleDetails: () => ({ commands, chain }) => {
				const selection = this.editor.state.selection.$to;
				if (selection.parent.type.name !== 'summary') {
					if (!isNested(selection.path)) { // избегаем вложенности
						let attributes = {};
						if (selection.parent.type.name === 'heading') {
							attributes = {class: 'h' + selection.parent.attrs.level}
						}

						chain().setTextSelection(selection.end()).setNode('summary', attributes).wrapIn('details', {open: true}).insertContent('<p></p>').run();
					}
				} else {
					let node = ['paragraph'];
					if (selection.parent.attrs.class && selection.parent.attrs.class.match(/^h\d$/)) {
						node = ['heading', {level: selection.parent.attrs.class[1]}];
					}

					chain().setTextSelection(selection.end()).lift().setNode(...node).selectNodeForward().clearNodes().run();

					setTimeout(() => { // чтобы не плодить пустые строки после разрушения нашего тогл компонента
						let newSelection = this.editor.state.selection.$to;
						if (!newSelection.parent.textContent.length) {
							this.editor.commands.deleteNode('paragraph');
						}
					},1);
				}

				function isNested(path) {
					for(let i = 0; i < path.length; i++) {
						if (typeof(path[i]) === 'object' && path[i].type.name === 'details') return true;
					}

					return false;
				}
			}
		}
	},

	onCreate({ editor }) {
		bindEvents(editor)
	},

	onUpdate({ editor }) {
		bindEvents(editor)
	},
})

function bindEvents(editor) {
	const updateDetailsElement = (detailsElement) => {
		const summaryElement = detailsElement.querySelector('summary')

		summaryElement.addEventListener('click', (e) => {
			editor.commands.updateAttributes('details', {open: !detailsElement.open})
		})
	}

	editor.view.dom.querySelectorAll('details').forEach(updateDetailsElement)
}