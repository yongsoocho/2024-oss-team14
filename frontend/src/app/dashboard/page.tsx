"use client";

import { CodeEditorWithDialog } from "./components/CodeEditor";
import Main from "./components/main";

export default function page() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Main />
      <CodeEditorWithDialog />
    </div>
  );
}
