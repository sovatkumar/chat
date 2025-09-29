import Sheet from "./components/sheet/Sheet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <Sheet />
      <ToastContainer />
    </div>
  );
}
