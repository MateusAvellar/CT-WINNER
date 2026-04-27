import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import Atividades from "./pages/Atividades";
import Horarios from "./pages/Horarios";
import Eventos from "./pages/Eventos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/atividades" element={<PublicLayout><Atividades /></PublicLayout>} />
          <Route path="/horarios" element={<PublicLayout><Horarios /></PublicLayout>} />
          <Route path="/eventos" element={<PublicLayout><Eventos /></PublicLayout>} />
          <Route path="/sobre" element={<PublicLayout><Sobre /></PublicLayout>} />
          <Route path="/contato" element={<PublicLayout><Contato /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
