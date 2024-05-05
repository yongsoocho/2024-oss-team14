"use client";

import { Table } from "@radix-ui/themes";
import { ReportedError, useGetReportedErrorListQuery } from "../remote";

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
            const values = Object.values(c);
            return (
              <Table.Row key={d.id}>
                {values.map((v, index) => {
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
