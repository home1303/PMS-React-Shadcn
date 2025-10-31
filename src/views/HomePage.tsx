import React, { useEffect, useState } from "react";
import "../css/first-page.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CBEsRes } from "@/service/model/cbes.model";

const Homepage: React.FC = () => {
  const [CBEsData, setCBEsData] = useState<CBEsRes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cbesPayloads");
    if (stored) setCBEsData(JSON.parse(stored));
  }, []);

  const onAdd = () => {
    navigate("/CbesForm", { state: { mode: "create" } });
  };

  const onEdit = (row: CBEsRes) => {
    navigate("/CbesForm", { state: { mode: "update", data: row } });
  };

  const onDelete = (item: CBEsRes) => {
    const confirmed = window.confirm(`คุณต้องการลบ "${item.thainame}" ใช่ไหม?`);
    if (!confirmed) return;
    const stored = localStorage.getItem("cbesPayloads");
    let payloads: CBEsRes[] = stored ? JSON.parse(stored) : [];

    const updatedPayloads = payloads.filter((p) => p.id !== item.id);

    localStorage.setItem("cbesPayloads", JSON.stringify(updatedPayloads));

    setCBEsData(updatedPayloads);
    alert("ลบข้อมูลเรียบร้อยแล้ว");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex pb-6 pt-12 pl-18">
        <p className="text-lg font-normal">จัดการหลักเกณฑ์ CBEs</p>
      </div>

      {/* Input */}
      <div className="flex items-center mb-4 ml-25 space-x-2">
        <label className="w-36 text-right">หัวข้อ:</label>
        <Input className="w-150" type="text" />

        <div className="flex justify-between items-center w-full ml-4 space-x-2">
          <Button>ค้นหา</Button>
          <div>
            <Button variant="default">กล่องขยะ</Button>
            <Button onClick={onAdd} className="ml-2">
              เพิ่ม
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="table-fixed border border-black w-[calc(100%-200px)] text-sm ml-auto">
          <TableHeader className="bg-teal-100 text-black">
            <TableRow>
              <TableHead className="w-1/2 text-center border border-black">
                หัวข้อ
              </TableHead>
              <TableHead className="w-1/6 text-center border border-black">
                สถานะ
              </TableHead>
              <TableHead className="w-2/5 text-center border border-black">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-black">
            {CBEsData.length > 0 ? (
              CBEsData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center border border-black">
                    {item.thainame}
                  </TableCell>
                  <TableCell className="text-center border border-black">
                    ใช้งาน
                  </TableCell>
                  <TableCell className="text-center flex flex-wrap justify-center gap-2">
                    <Button size="sm" onClick={() => onEdit(item)}>
                      แก้ไข
                    </Button>
                    <Button size="sm">ผู้รับผิดชอบ</Button>
                    <Button size="sm">ประวัติการแก้ไข</Button>
                    <Button size="sm" onClick={() => onDelete(item)}>
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center border border-black"
                >
                  ไม่มีข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Homepage;
