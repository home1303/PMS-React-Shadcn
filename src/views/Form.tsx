"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CREsFormSub from "../components/cbesForm/cbesFormSub";

import type { CBEsRes } from "../service/model/cbes.model";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CBEsFormPage: React.FC = () => {
  const [formValue, setFormValue] = useState<CBEsRes & { note?: string }>({
    thainame: "",
    name: "",
    abbreviation: "",
    roundedit: 1,
    note: "",
    processes: [],
  });

  const location = useLocation();
  const { mode, data } =
    location.state ||
    ({} as {
      mode: "create" | "update";
      data?: CBEsRes;
    });
  useEffect(() => {
    if (mode === "update" && data) {
      setFormValue({
        thainame: data.thainame || "",
        name: data.name || "",
        abbreviation: data.abbreviation || "",
        roundedit: data.roundedit || 1,
        note: data.notes?.[0]?.text || "",
        processes: data.processes || [],
      });
      setTableData(data.processes || []); 
    }
  }, [mode, data]);

  const [tableData, setTableData] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleAddMainProcess = () => {
    setTableData((prev) => [
      ...prev,
      {
        process: "",
        issue: "",
        subissue: "",
        weight: 0,
        children: [],
        level: 1,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCreate = mode;

    console.log(isCreate);

    const payload: CBEsRes = {
      id: isCreate ? Date.now() : formValue.id,
      thainame: formValue.thainame,
      name: formValue.name,
      abbreviation: formValue.abbreviation,
      roundedit: formValue.roundedit,
      notes: [{ round: 1, text: formValue.note || "" }],
      processes: tableData,
    };

    if (!payload.name || payload.name.trim() === "") {
      alert("กรุณากรอกชื่อก่อนบันทึก");
      return;
    }

    const stored = localStorage.getItem("cbesPayloads");
    let payloads: CBEsRes[] = stored ? JSON.parse(stored) : [];

    if (isCreate) {
      payloads.push(payload);

      console.log(payload);
    } else {
      const index = payloads.findIndex((p) => p.id === payload.id);
      if (index !== -1) payloads[index] = payload;
    }

    localStorage.setItem("cbesPayloads", JSON.stringify(payloads));
    navigate("/home");
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex pb-6 pt-12 pl-18">
          <p className="text-lg font-normal">จัดการหลักเกณฑ์ CBEs</p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Label className="w-33 text-right">หัวข้อภาษาไทย:</Label>
            <Input
              value={formValue.thainame}
              onChange={(e) =>
                setFormValue({ ...formValue, thainame: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label className="w-33 text-right">หัวข้อภาษาอังกฤษ:</Label>
            <Input
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label className="w-33 text-right">ตัวย่อ:</Label>
            <Input
              value={formValue.abbreviation}
              onChange={(e) =>
                setFormValue({ ...formValue, abbreviation: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label className="w-33 text-right">รอบการแก้ไข:</Label>
            <Select
              value={String(formValue.roundedit)}
              onValueChange={(val) =>
                setFormValue({ ...formValue, roundedit: Number(val) })
              }
            >
              <SelectTrigger className="w-32 !text-white">
                <SelectValue placeholder="รอบ" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: (formValue.notes?.length || 0) + 1 },
                  (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      รอบที่ {i + 1}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-4">
            <Label className="w-33 text-right">หมายเหตุในการบันทึก:</Label>
            <Textarea
              value={formValue.note}
              onChange={(e) =>
                setFormValue({ ...formValue, note: e.target.value })
              }
              className="w-96 h-24"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleAddMainProcess}>
              เพิ่มกระบวนการณ์
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex items-center space-x-4">
          <div className="w-33 text-right">หลักเกณฑ์:</div>
        </div>
        <div className="flex justify-end overflow-x-auto mt-3">
          <Table className="table-fixed border border-black w-[calc(100%-150px)] text-sm ml-auto">
            <TableHeader className="bg-teal-100 text-black">
              <TableRow>
                <TableHead className="w-1/4 border border-black">
                  กระบวนการ
                </TableHead>
                <TableHead className="w-1/4 border border-black">
                  ประเด็น
                </TableHead>
                <TableHead className="w-1/4 border border-black">
                  ประเด็นย่อย
                </TableHead>
                <TableHead className="w-1/12 border border-black">
                  น้ำหนัก
                </TableHead>
                <TableHead className="w-1/6 border border-black">
                  จัดการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-black">
              <CREsFormSub tableData={tableData} setTableData={setTableData} />
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <Button type="submit">บันทึกและไปหน้ากำหนด Maturity</Button>
          <Button type="submit" variant="default">
            Level บันทึก
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CBEsFormPage;
