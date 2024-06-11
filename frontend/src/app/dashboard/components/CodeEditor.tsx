import React, { useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import { Dialog } from "@/components/Dialog/Dialog";
import { IconButton } from "@radix-ui/themes";
import {
  ConsoleResult,
  sendPyCode,
  useGetReportedErrorListQuery,
} from "../remote";

function CodeEditor({ editorRef }: { editorRef: React.MutableRefObject<any> }) {
  return (
    <Editor
      width={"500px"}
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
  const refetchErrorList = useGetReportedErrorListQuery().refetch;

  const [result, setResult] = useState<ConsoleResult | null>(null);

  return (
    <>
      <Dialog
        triggerComponent={
          <div>
            <OpenButton />
          </div>
        }
        title="Python Code Editor"
        description="Python 코드에서 에러를 발생시켜보고, solution을 받아보아요. Python의 내장 모듈, Numpy, Pandas 을 import 하여 사용할 수 있습니다."
        confirmButtonTitle="Execute"
        onConfirm={async () => {
          const code = editorRef.current.getValue();

          try {
            const result = (await sendPyCode({ code })).data;

            setResult(result);
          } catch (e: any) {
            if (e?.response?.data) {
              setResult(e.response?.data);
              await refetchErrorList();
            }
          }
        }}
      >
        <div style={{ display: "flex" }}>
          <CodeEditor editorRef={editorRef} />
          {result == null ? (
            <div></div>
          ) : (
            <Result statusCode={result?.statusCode} result={result.data} />
          )}
        </div>
      </Dialog>
    </>
  );
}

function Result({
  statusCode,
  result,
}: {
  statusCode: number;
  result: string;
}) {
  if (statusCode === 500) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={{ color: "red" }}>{result}</div>
        <div>창을 닫고, 해결책을 확인해보세요</div>
      </div>
    );
  }
  return <div>{result}</div>;
}

function OpenButton() {
  return (
    <IconButton
      color="indigo"
      radius="full"
      size="4"
      style={{
        position: "fixed",
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
