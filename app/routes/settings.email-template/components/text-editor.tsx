import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function TextEditor({ defaultContent }) {
  const [content, setContent] = useState(
    defaultContent ??
      `<p>Mr/Mrs/Ms {customer_name}</p>
<p>You have requested claim on your order : {order_no}. Your claim has been requested.</p>
<p>Order Detail :&nbsp;</p>
<table style="border-collapse: collapse; width: 100.035%; height: 108.516px;" border="1"><colgroup><col style="width: 49.9079%;"><col style="width: 49.9079%;"></colgroup>
<tbody>
<tr style="height: 36.1719px;">
<td>Customer Name</td>
<td>{customer_name}</td>
</tr>
<tr style="height: 36.1719px;">
<td>Order No</td>
<td>{order_no}</td>
</tr>
<tr style="height: 36.1719px;">
<td>Status</td>
<td>{claimed}</td>
</tr>
</tbody>
</table>
<p>Thank You.</p>`
  );

  return (
    <Editor
      apiKey="f5rl88c4ciy49491qh1kaq0eppapgwu266la3n70usyspvkx"
      init={{
        plugins: [
          // Core editing features
          'anchor',
          'autolink',
          'charmap',
          'codesample',
          'emoticons',
          'image',
          'link',
          'lists',
          'media',
          'searchreplace',
          'table',
          'visualblocks',
          'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Sep 23, 2024:
          'checklist',
          'mediaembed',
          'casechange',
          'export',
          'formatpainter',
          'pageembed',
          'a11ychecker',
          'tinymcespellchecker',
          'permanentpen',
          'powerpaste',
          'advtable',
          'advcode',
          'editimage',
          'advtemplate',
          'ai',
          'mentions',
          'tinycomments',
          'tableofcontents',
          'footnotes',
          'mergetags',
          'autocorrect',
          'typography',
          'inlinecss',
          'markdown',
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject('See docs to implement AI Assistant')
          ),
      }}
      initialValue={content}
      onChange={(e) => console.log(e.target.getContent())}
    />
  );
}
