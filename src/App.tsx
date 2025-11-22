import { AVAILABLE_ROLE } from "@utils/constants";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes";

function App() {
  const role = AVAILABLE_ROLE.PARTNER;

  return (
    // <div className="p-10 border bg-black text-white">
    //   <h1>Partner dashboard</h1>
    // </div>
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
