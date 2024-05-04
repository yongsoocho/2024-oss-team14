import React from "react";
import ReportedErrorList from "./reported-error-list";
import Search from "./search";

export default function Main() {
  return (
    <div>
      <Search />
      <ReportedErrorList />
    </div>
  );
}
