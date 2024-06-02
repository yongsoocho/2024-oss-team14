import React, { useRef } from "react";

import Editor from "@monaco-editor/react";
import { Dialog } from "@/components/Dialog/Dialog";
import { IconButton } from "@radix-ui/themes";

function CodeEditor({ editorRef }: { editorRef: React.MutableRefObject<any> }) {
  return (
    <Editor
      height="500px"
      defaultLanguage="python"
      defaultValue={`print("Hello World")`}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
}

export function CodeEditorWithDialog() {
  const editorRef = useRef<any>(null);
  return (
    <Dialog
      triggerComponent={
        <div>
          <OpenButton />
        </div>
      }
      title="Python Code Editor"
      description="Python 코드에서 에러를 발생시켜보고, solution을 받아보아요."
      confirmButtonTitle="Execute"
      onConfirm={() => {}}
    >
      <CodeEditor editorRef={editorRef} />
    </Dialog>
  );
}

function OpenButton() {
  return (
    <IconButton
      color="indigo"
      radius="full"
      size="4"
      style={{
        position: "absolute",
        right: "24px",
        bottom: "24px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        cursor: "pointer",
      }}
    >
      Test
    </IconButton>
  );
}
