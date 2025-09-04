import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const FormPage = lazy(() => import("../pages/FormPage"));
const CurriculosPage = lazy(() => import("../pages/CurriculosPage"));
const ViewPage = lazy(() => import("../pages/ViewPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <Suspense fallback={<p className="p-8 text-center">Carregando...</p>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/criar-curriculo" element={<FormPage />} />
            <Route path="/visualizar-curriculos" element={<CurriculosPage />} />
            <Route path="/curriculo/:id" element={<ViewPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
