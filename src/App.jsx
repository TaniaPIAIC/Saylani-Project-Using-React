import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";



const App = () => {
  return (
    <>
      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path='/student-login' element={<StudentLogin />} />
      </Routes>
    </>
    
  );
};

export default App;
