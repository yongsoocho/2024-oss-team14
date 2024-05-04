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
