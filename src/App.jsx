import HomePage from "./pages/Home";
import FeaturedPage from "./pages/Featured";
import MenuPage from "./pages/Menu";
import MainLayout from "./layouts/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
