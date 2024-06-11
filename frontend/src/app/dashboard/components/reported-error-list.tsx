"use client";

import { Badge, Button, Flex, Table, Text, TextArea } from "@radix-ui/themes";
import {
  ReportedError,
  reSolutionError,
  resolveError,
  useGetReportedErrorListQuery,
} from "../remote";
import React, { useMemo, useState } from "react";
import { Dialog } from "@/components/Dialog/Dialog";
import { useLoading } from "@/hooks/useLoading";
import { useGetSearchQuery } from "./search";
import { ResolvedStatus, useGetResolvedFilter } from "./DropdownFilter";
import { delay } from "@/utils/delay";
import { AxiosError } from "axios";

function extractKeys<T extends Record<string, unknown>>(
  obj: T,
  keys: (keyof T)[]
) {
  const arr = Object.entries(obj);
  const extractedArr = arr.filter((r) => keys.includes(r[0]));

  const result: Record<string, unknown> = {};
  extractedArr.forEach((r) => {
    result[r[0]] = r[1];
  });

  return result;
}

type ErrorKeys = (keyof ReportedError)[];
const tableKeys: ErrorKeys = ["message", "statusCode", "stack", "solution"];

function useFilteredErrorList() {
  const data = useGetReportedErrorListQuery().data.data.data;

  const searchQuery = useGetSearchQuery();
  const resolvedFilter = useGetResolvedFilter();

  return useMemo(() => {
    return filterResolvedStatus(filterQuery(data, searchQuery), resolvedFilter);
  }, [searchQuery, resolvedFilter, data]);
}
function filterQuery<T extends unknown>(arr: T[], searchQuery: string) {
  return arr.filter((el) => JSON.stringify(el).includes(searchQuery));
}
function filterResolvedStatus(
  arr: ReportedError[],
  resolvedStatus: ResolvedStatus
) {
  if (resolvedStatus === "all") {
    return arr;
  }
  if (resolvedStatus === "resolved") {
    return arr.filter((el) => el.isResolved === true);
  }

  if (resolvedStatus === "unresolved") {
    return arr.filter((el) => el.isResolved === false);
  }
  return arr;
}

export default function ReportedErrorList() {
  const data = useFilteredErrorList();

  if (data.length === 0) {
    return <Text>에러가 없습니다.</Text>;
  }

  const headers = (Object.keys(data[0]) as ErrorKeys).filter((c) =>
    tableKeys.includes(c)
  );

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headers.map((k) => (
              <Table.ColumnHeaderCell key={k}>{k}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((d) => {
            const c = extractKeys(d, tableKeys);
            const entries = Object.entries(c);
            return (
              <Table.Row key={d._id}>
                {entries.map(([k, v], index) => {
                  if (k === "solution") {
                    return (
                      <Table.Cell key={index}>
                        <div>
                          {d.recycle === true && (
                            <Badge color="blue">기존 응답 재활용</Badge>
                          )}
                          {JSON.stringify(v)}
                        </div>
                        {d.isResolved !== true ? (
                          <Flex gap={"2"}>
                            <ResolveButton errorId={d._id} />
                            <RePromptButton errorId={d._id} />
                          </Flex>
                        ) : (
                          <Badge color="green">Resolved!</Badge>
                        )}
                      </Table.Cell>
                    );
                  }
                  if (index === 0) {
                    return (
                      <Table.RowHeaderCell key={index}>
                        <Txt>{JSON.stringify(v)}</Txt>
                      </Table.RowHeaderCell>
                    );
                  }
                  return (
                    <Table.Cell key={index}>{JSON.stringify(v)}</Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

function Txt({ children }: { children: string }) {
  return (
    <span>
      {children.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </span>
  );
}

function ResolveButton({ errorId }: { errorId: string }) {
  const refetch = useGetReportedErrorListQuery().refetch;
  const [loading, startLoading] = useLoading();

  return (
    <Button
      type="button"
      loading={loading}
      onClick={() => {
        startLoading(
          (async () => {
            await resolveError({ errorId });
            await refetch();
          })()
        );
      }}
    >
      Resolve
    </Button>
  );
}

function RePromptButton({ errorId }: { errorId: string }) {
  const [value, setValue] = useState("");
  const refetch = useGetReportedErrorListQuery().refetch;
  const [loading, startLoading] = useLoading();
  return (
    <>
      <Dialog
        triggerComponent={
          <Button type="button" color="ruby" loading={loading}>
            Re-Prompt
          </Button>
        }
        confirmButtonTitle="Re-Prompt"
        title="message to ChatGPT"
        description="더 좋은 답변을 받기 위해서 메시지를 추가해주세요"
        onConfirm={async () => {
          await startLoading(
            (async () => {
              try {
                await reSolutionError({ errorId, promptMessage: value });
              } catch (e) {
                if (e instanceof AxiosError && "response" in e) {
                  console.log("e", e);
                  if (e.status !== 400) {
                    alert("알 수 없는 에러가 발생했어요");
                    return;
                  }
                  const type = e.response?.data.data as string;
                  if (type === "no") {
                    alert("해당 에러와 관련 없는 대화입니다.");
                    return;
                  }
                  if (type !== "no") {
                    alert("정책에 위배되는 대화 내용입니다.");
                    return;
                  }
                }
              }
              await refetch();
              setValue("");
            })()
          );
        }}
        closeOnConfirm={true}
      >
        <TextArea value={value} onChange={(e) => setValue(e.target.value)} />
      </Dialog>
    </>
  );
}
