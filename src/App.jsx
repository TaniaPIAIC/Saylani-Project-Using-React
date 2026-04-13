import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";



const App = () => {
  return (
    <>
      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path='/student-login' element={<StudentLogin />} />
        <Route path='/student-signup' element={<StudentSignup />} />
      </Routes>
    </>
    
  );
};

export default App;
