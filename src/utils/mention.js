import { Plugin, ButtonView } from 'ckeditor5';

export default class Mention extends Plugin {
    init() {
        const editor = this.editor;

        editor.model.schema.extend('paragraph', {
            allowAttributes: ['class']
        });

        editor.conversion.for('upcast').attributeToAttribute({
            model: {
                name: 'paragraph',
                key: 'class'
            },
            view: {
                name: 'p',
                key: 'class'
            }
        });

        editor.conversion.for('downcast').attributeToAttribute({
            model: {
                name: 'paragraph',
                key: 'class'
            },
            view: {
                name: 'p',
                key: 'class'
            }
        });

        editor.commands.get('enter').on('execute', (evt, data) => {
            const selection = editor.model.document.selection;
            const position = selection.getFirstPosition();
            const parentElement = position.parent;

            if (parentElement.is('element', 'paragraph') && parentElement.getAttribute('class') === 'quote') {
                evt.stop();

                editor.model.change(writer => {
                    const paragraph = writer.createElement('paragraph');
                    editor.model.insertContent(paragraph, editor.model.document.selection);
                });
            }
        });

        editor.ui.componentFactory.add('mention', locale => {
            const button = new ButtonView(locale);

            button.set({
                label: 'Inserir Mention',
                withText: true,
            });

            button.on('execute', () => {
                editor.model.change(writer => {
                    const blockquote = writer.createElement('paragraph', { class: 'quote' });
                    const textNode = writer.createText('This is an example of a quote.');

                    writer.append(textNode, blockquote);

                    editor.model.insertContent(blockquote, editor.model.document.selection);
                });

            });

            return button;
        });
    }
}