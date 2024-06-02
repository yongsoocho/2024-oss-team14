"use client";

import SSRSafeSuspense from "@/components/SSRSafe";
import { CodeEditorWithDialog } from "./components/CodeEditor";
import Main from "./components/main";

export default function page() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Main />
      <SSRSafeSuspense>
        <CodeEditorWithDialog />
      </SSRSafeSuspense>
    </div>
  );
}
