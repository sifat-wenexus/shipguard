import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { Box, Card, TextField } from '@shopify/polaris';
import { useCallback, useEffect, useRef } from 'react';
import { liquid } from '@codemirror/lang-liquid';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

const LiquidEditor = ({
  templateSubject,
  setTemplateSubject,
  templatePreview,
  setTemplatePreview,
  templateName,
}) => {
  const fetcher = useBetterFetcher();

  const editorRef = useRef<HTMLDivElement>(null);
  let editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: templatePreview,
      extensions: [
        basicSetup,
        liquid(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            const newContent = update.state.doc.toString();
            setTemplatePreview(newContent);
          }
        }),
      ],
    });

    editorViewRef.current = new EditorView({
      state: state,
      parent: editorRef.current,
    });

    //   // Cleanup editor view on component unmount
    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
      }
    };
  }, []);

  const handleSave = useCallback(() => {
    const newContent = editorViewRef.current?.state.doc.toString();
    return fetcher.submit(
      {
        loading: true,
        toast: true,
      },
      {
        action: 'update',
        state: JSON.stringify({
          body: newContent,
          subject: templateSubject,
          name: templateName,
        }),
      },
      {
        method: 'post',
      }
    );
  }, [fetcher]);

  return (
    <>
      <Card>
        <div className="w-full sm:p-2">
          <div>
            <Box paddingBlockStart="200" paddingBlockEnd="200">
              <TextField
                autoComplete="true"
                label="Email Subject"
                value={templateSubject}
                onChange={setTemplateSubject}
                requiredIndicator
              />
            </Box>
            <div className="mt-2">
              <h1 className="my-1">Email Body (HTML)</h1>
              <div ref={editorRef}></div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-end my-4">
        <button
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500"
          onClick={handleSave}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default LiquidEditor;
