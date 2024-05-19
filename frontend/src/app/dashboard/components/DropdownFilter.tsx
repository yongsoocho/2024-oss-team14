import { Button, DropdownMenu } from "@radix-ui/themes";
import { atom, useAtom, useAtomValue } from "jotai";

const resolvedFilterAtom = atom<"all" | "resolved" | "unresolved">("all");
export function useGetResolvedFilter() {
  return useAtomValue(resolvedFilterAtom);
}
export type ResolvedStatus = "all" | "resolved" | "unresolved";
export default function DropdownFilter() {
  const [resolvedFilter, setResolvedFilter] = useAtom(resolvedFilterAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="classic">
          {resolvedFilter}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setResolvedFilter("all")}>
          View all
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setResolvedFilter("resolved")}>
          View resolved only
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setResolvedFilter("unresolved")}>
          View unresolved only
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
