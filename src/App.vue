<script setup>
    import { ref } from 'vue';

    import { ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo } from 'ckeditor5';
    import { Ckeditor } from '@ckeditor/ckeditor5-vue';

    import Mention from './utils/mention';

    const editor = ClassicEditor;
    const editorData = ref('<p>Escreva algo...</p>');

    const editorConfig = {
        plugins: [Bold, Essentials, Italic, Paragraph, Undo, Mention],
        toolbar: ['undo', 'redo', 'bold', 'italic', 'mention'],
    };
</script>

<template>
    <div id="editorPrincipal">
        <h3>Crie sua resenha...</h3>
        <Ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
    </div>
</template>

<style>
    @import "ckeditor5/ckeditor5.css";
    @import "ckeditor5-premium-features/ckeditor5-premium-features.css";
    @import "./assets/mention.css";
</style>