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

type ServerResponse<T> = {
  data: T;
  statusCode: number;
};

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
  return client.get<ServerResponse<ReportedError[]>>("/error-list");
}
export function useGetReportedErrorListQuery() {
  return useSuspenseQuery({
    queryKey: ["getReportedErrorList"],
    queryFn: () => getReportedErrorList(),
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function resolveError({ errorId }: { errorId: number }) {
  return client.post(`/errors/resolve`, { id: errorId });
}

export function reSolutionError({
  errorId,
  promptMessage,
}: {
  errorId: number;
  promptMessage: string;
}) {
  return client.post(`/errors/re-solution`, {
    id: errorId,
    feedback: promptMessage,
  });
}

export function sendPyCode({ code }: { code: string }) {
  return client.post(`/errors/py`, { code });
}
