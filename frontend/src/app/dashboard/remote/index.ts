import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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
      },
      {
        id: 2,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 400,
        stack: "fail to reference",
        solution: "from chat gpt",
      },
      {
        id: 3,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 401,
        stack: "fail to reference",
        solution: "from chat gpt",
      },
      {
        id: 4,
        project: "cautry web view",
        tags: ["python", "javascript"],
        message: "error message",
        statusCode: 404,
        stack: "fail to reference",
        solution: "from chat gpt",
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