import React from "react";
import HomeRouter from "./homeRouter";
import CbesForm from "./cbes";
import TestRouter from "./testRouter"

const AllRouter: React.FC = () => (
  <>
    <HomeRouter />
    <CbesForm />
    <TestRouter />
  </>
);

export default AllRouter;
