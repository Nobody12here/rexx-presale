import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeV1 from "./pages/HomeV1";
import HomeV2 from "./pages/HomeV2";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomeV4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
