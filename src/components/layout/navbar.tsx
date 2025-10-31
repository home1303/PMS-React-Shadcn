"use client";

export default function Navbar() {
  return (
    <nav className="w-full bg-white text-black flex items-center p-4 border-b-3 border-blue-300">
      <img src="/icons/mrta-icon.png" alt="@mrta-icon" className="w-80 h-12" />

      <div className="flex items-center space-x-8 ml-64">
        <a href="#" className="!text-black text-xs">
          ผู้ดูแลระบบ
        </a>
        <a href="/CbesForm" className="!text-black text-xs">
          จัดการหลักเกณฑ์ CBEs
        </a>
        <a href="#" className="!text-black text-xs">
          จัดการแผนกวิสาหกิจ
        </a>
        <a href="#" className="!text-black text-xs">
          จัดการแผนกแม่บท
        </a>
        <a href="#" className="!text-black text-xs">
          ข้อมูลตัวชี้วัด
        </a>
        <a href="#" className="!text-black text-xs">
          จัดการโครงการ
        </a>
        <a href="#" className="!text-black text-xs">
          รายงาน
        </a>
      </div>

      <div className="flex flex-col ml-auto text-right space-y-1">
        <p className="!text-black text-xs">ชื่อ: นายบุญญฤทธิ์ นวนชนะ</p>
        <p className="!text-black text-xs">บทบาท: IT/ผู้ดูแลระบบ</p>
      </div>
      
    </nav>
  );
}
