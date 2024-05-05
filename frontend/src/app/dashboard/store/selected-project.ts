import { atomFamily, atomWithStorage } from "jotai/utils";
import { Project } from "../remote";

export const selectedProjectAtom = atomFamily(
  (project: Project) => atomWithStorage("selectedProject", project),
  (a, b) => a.projectId === b.projectId
);
