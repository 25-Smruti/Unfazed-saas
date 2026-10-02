import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function NoteEditor({ content = '', onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white min-h-[220px]">
      <EditorContent editor={editor} />
    </div>
  );
}
