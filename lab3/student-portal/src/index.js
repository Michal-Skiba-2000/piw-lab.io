import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from "./App";
import StudentAd from "./routes/student-ad";
import Login from "./routes/login";
import StudentAdAdd from './routes/student-ad-add';
import Navbar from './components/navbar/navbar';
import GroupAd from './routes/group-ad';
import GroupAdAdd from './routes/group-ad-add';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="student-ad" element={<StudentAd />} />
      <Route path="student-ad-add" element={<StudentAdAdd />} />
      <Route path="login" element={<Login />} />
      <Route path="group-ad" element={<GroupAd />} />
      <Route path="group-ad-add" element={<GroupAdAdd />} />
    </Routes>
  </BrowserRouter>,
);
