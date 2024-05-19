"use client";

import { Button, Flex, Table, TextArea } from "@radix-ui/themes";
import {
  ReportedError,
  reSolutionError,
  resolveError,
  useGetReportedErrorListQuery,
} from "../remote";
import React, { useState } from "react";
import { Dialog } from "@/components/Dialog/Dialog";
import { useLoading } from "@/hooks/useLoading";

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

export default function ReportedErrorList() {
  const data = useGetReportedErrorListQuery().data;

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
              <Table.Row key={d.id}>
                {entries.map(([k, v], index) => {
                  if (k === "solution") {
                    return (
                      <Table.Cell key={index}>
                        <div>{JSON.stringify(v)}</div>
                        <Flex gap={"2"}>
                          <ResolveButton errorId={d.id} />
                          <RePromptButton errorId={d.id} />
                        </Flex>
                      </Table.Cell>
                    );
                  }
                  if (index === 0) {
                    return (
                      <Table.RowHeaderCell key={index}>
                        {JSON.stringify(v)}
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

function ResolveButton({ errorId }: { errorId: number }) {
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

function RePromptButton({ errorId }: { errorId: number }) {
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
        onConfirm={() => {
          startLoading(
            (async () => {
              await reSolutionError({ errorId, promptMessage: value });
              await refetch();
              setValue("");
            })()
          );
        }}
      >
        <TextArea value={value} onChange={(e) => setValue(e.target.value)} />
      </Dialog>
    </>
  );
}
