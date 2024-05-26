import { client } from "@/remote";
import { useSuspenseQuery } from "@tanstack/react-query";

export type Project = { projectId: number; tags: string[]; name: string };
async function getProjectList() {
  return new Promise<Project[]>((res) =>
    res([
      { projectId: 1, tags: ["python"], name: "결제 서버" },
      { projectId: 2, tags: ["python"], name: "정산 서버" },
      { projectId: 3, tags: ["python"], name: "결제 프론트엔드" },
    ])
  );
}

export function useGetProjectListQuery() {
  return useSuspenseQuery({
    queryKey: ["getProjectList"],
    queryFn: () => getProjectList(),
  });
}

export type ReportedError = {
  id: number;
  project: string;
  tags: string[];
  message: string;
  statusCode: number;
  stack: string;
  solution: string;
  isResolved: boolean;
};
async function getReportedErrorList() {
  return new Promise<ReportedError[]>((res) =>
    res([
      {
        id: 1,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 500,
        stack: "fail to reference",
        solution: "from chat gpt",
        isResolved: false,
      },
      {
        id: 2,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 400,
        stack: "fail to reference",
        solution: "from chat gpt",
        isResolved: false,
      },
      {
        id: 3,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 401,
        stack: "fail to reference",
        solution: "from chat gpt",
        isResolved: true,
      },
      {
        id: 4,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 404,
        stack: "fail to reference",
        solution: "from chat gpt",
        isResolved: true,
      },
    ])
  );
}
export function useGetReportedErrorListQuery() {
  return useSuspenseQuery({
    queryKey: ["getReportedErrorList"],
    queryFn: () => getReportedErrorList(),
  });
}

export function resolveError({ errorId }: { errorId: number }) {
  return new Promise((res) => res(true));
  // return client.post(`/errors/resolve`);
}

export function reSolutionError({
  errorId,
  promptMessage,
}: {
  errorId: number;
  promptMessage: string;
}) {
  return new Promise((res) => res(true));
  // return client.post(`/errors/fail`);
}
