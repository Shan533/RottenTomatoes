import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Profile from "./pages/Profile";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin";
import ProgramForm from "./pages/Admin/Programs/ProgramForm";
import ProgramInfo from "./pages/ProgramInfo";
import School from "./pages/School";
import ProgramsPage from "./pages/Home/ProgramsPage/ProgramsPage";
import SchoolsPage from "./pages/Home/SchoolsPage/SchoolsPage";
import ReviewsPage from "./pages/Home/ReviewsPage/ReviewsPage";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/programspage"
            element={
              <ProtectedPage>
                <ProgramsPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/schoolspage"
            element={
              <ProtectedPage>
                <SchoolsPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/reviewspage"
            element={
              <ProtectedPage>
                <ReviewsPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/program/:id"
            element={
              <ProtectedPage>
                <ProgramInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/school/:id"
            element={
              <ProtectedPage>
                <School />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/programs/add"
            element={
              <ProtectedPage>
                <ProgramForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/programs/edit/:id"
            element={
              <ProtectedPage>
                <ProgramForm />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
