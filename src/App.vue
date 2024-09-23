<script setup>
    import { ref } from 'vue';

    import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Plugin, ButtonView } from 'ckeditor5';
    import { Ckeditor } from '@ckeditor/ckeditor5-vue';

    import "ckeditor5/ckeditor5.css";
    import "ckeditor5-premium-features/ckeditor5-premium-features.css";

    class mentionPlugin extends Plugin {
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
                    label: 'Inserir Texto',
                    withText: true,
                });

                button.on('execute', () => {
                    editor.model.change(writer => {
                        const blockquote = writer.createElement('paragraph', { class: 'quote' });
                        const textNode = writer.createText('Este é um exemplo de citação.');

                        writer.append(textNode, blockquote);

                        editor.model.insertContent(blockquote, editor.model.document.selection);
                    });

                });

                return button;
            });
        }
    }

    const editor = ClassicEditor;
    const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>');

    const editorConfig = {
        plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, mentionPlugin],
        toolbar: ['undo', 'redo', 'bold', 'italic', 'mention'],
        licenseKey: 'QkIzcDFtb0IzZkxtWHozeC9iT3JYZ1V6akpQcGkzaTQzSDFxWjViY3FQd2d0SWZwdlprZHQ1M1BVRzBobUE9PS1NakF5TkRFd01qST0=',
    };
</script>

<template>
    <div id="app">
        <Ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
    </div>
</template>

<style>
    .quote {
        border-left: 2px solid rgb(24, 131, 33);
        color: #ccc;
        font-style: italic;
        padding-left: 15px;
        margin: 10px 0;
    }
</style>