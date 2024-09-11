import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function TextEditor({ defaultContent, setEditorState }) {
  const [content, setContent] = useState(defaultContent ?? '');

  return (
    <Editor
      apiKey="f5rl88c4ciy49491qh1kaq0eppapgwu266la3n70usyspvkx"
      toolbar={false}
      initialValue={content}
      onChange={(e) => setEditorState(e.target.getContent())}
    />
  );
}
