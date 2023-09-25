import "./App.css";
import SignupForm from "./components/pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <SignupForm></SignupForm>
    </div>
  );
}

export default App;
