import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { processRes } from "@/service/model/process.model";
import { TableCell, TableRow } from "../ui/table";

interface CREsFormSubProps {
  tableData?: processRes[];
  setTableData: (newData: processRes[]) => void;
}

const CREsFormSub: React.FC<CREsFormSubProps> = ({
  tableData,
  setTableData,
}) => {
  const updateRow = (index: number, key: keyof processRes, value: any) => {
    if (!tableData) return;
    const newData = [...tableData];
    newData[index] = { ...newData[index], [key]: value };
    setTableData(newData);
  };

  const addProcess = (index: number) => {
    if (!tableData) return;
    const newData = [...tableData];
    const row = newData[index];
    if (!row.children) row.children = [];
    row.children.push({
      process: "",
      issue: "",
      subissue: "",
      weight: 0,
      level: row.level + 1,
      children: [],
    });
    setTableData(newData);
  };

  const deleteRow = (index: number) => {
    if (!tableData) return;
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };

  return (
    <>
      {tableData?.map((row, index) => (
        <React.Fragment key={index}>
          <TableRow>
            <TableCell className="p-2 border border-black">
              {row.level === 1 ? (
                <Textarea
                  placeholder="Process"
                  value={row.process}
                  onChange={(e) => updateRow(index, "process", e.target.value)}
                  className="w-full"
                />
              ) : (
                <span>{row.process}</span>
              )}
            </TableCell>
            <TableCell className="p-2 border border-black">
              {row.level === 2 ? (
                <Textarea
                  placeholder="Issue"
                  value={row.issue}
                  onChange={(e) => updateRow(index, "issue", e.target.value)}
                  className="w-full"
                />
              ) : (
                <span>{row.issue}</span>
              )}
            </TableCell>
            <TableCell className="p-2 border border-black">
              {row.level === 3 ? (
                <Textarea
                  placeholder="SubIssue"
                  value={row.subissue}
                  onChange={(e) => updateRow(index, "subissue", e.target.value)}
                  className="w-full"
                />
              ) : (
                <span>{row.subissue}</span>
              )}
            </TableCell>
            <TableCell className="p-2 border border-black">
              <Input
                type="number"
                value={row.weight}
                onChange={(e) =>
                  updateRow(index, "weight", Number(e.target.value))
                }
                className="w-full"
              />
            </TableCell>
            <TableCell className="p-2 flex flex-wrap gap-2 mt-4">
              <Button
                type="button"
                size="sm"
                // variant="destructive"
                onClick={() => deleteRow(index)}
              >
                ลบ
              </Button>
              {row.level === 1 && (
                <Button
                  type="button"
                  size="sm"
                  className="flex-1 min-w-[80px]"
                  onClick={() => addProcess(index)}
                >
                  เพิ่มประเด็น
                </Button>
              )}
              {row.level === 2 && (
                <Button
                  type="button"
                  size="sm"
                  className="flex-1 min-w-[100px]"
                  onClick={() => addProcess(index)}
                >
                  เพิ่มประเด็นย่อย
                </Button>
              )}
            </TableCell>
          </TableRow>

          {/* Recursive children */}
          {row.children && row.children.length > 0 && (
            <CREsFormSub
              tableData={row.children || []}
              setTableData={(newChildren) => {
                if (!tableData) return;
                const newData = [...tableData];
                newData[index] = { ...newData[index], children: newChildren };
                setTableData(newData);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default CREsFormSub;
