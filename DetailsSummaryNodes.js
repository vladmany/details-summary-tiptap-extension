import { Node } from '@tiptap/core'

export const Details = Node.create({
	name: 'details',
	priority: 200,
	content: 'block*',
	group: 'block',
	selectable: true,
	defining: true,
	atom: false,

	parseHTML() {
		return [
			{ tag: 'details' },
		]
	},
	renderHTML({ HTMLAttributes }) {
		return ['details', HTMLAttributes, 0]
	}
})

export const Summary = Node.create({
	name: 'summary',
	priority: 200,
	content: 'inline*',
	group: 'block',
	selectable: true,
	defining: true,
	atom: false,

	parseHTML() {
		return [
			{ tag: 'summary' },
		]
	},
	renderHTML({ HTMLAttributes }) {
		return ['summary', HTMLAttributes, 0]
	}
})