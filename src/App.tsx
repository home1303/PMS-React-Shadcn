import React from "react";
import AllRouter from "./controllers/AllRouter";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 mt-[24px]">
        <AllRouter />
      </main>
    </div>
  );
};

export default App;
