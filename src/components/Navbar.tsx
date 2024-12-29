import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Access the current location object
  const navigate = useNavigate();
  return (
    <nav className="w-full max-h-[8vh] bg-[#1f1f1f] flex p-[1.5vh_5%]">
      <div className="logo flex">
        <img src="/logo.svg" alt="Logo" />
      </div>

      {location.pathname == "/" ? (
        <button onClick={() => navigate("/login")} className="ml-auto p-[5px_20px_5px_20px] rounded-[10px] bg-[#CCF575]">
          Login
        </button>
      ) : (
        <button  className="ml-auto p-[5px_20px] rounded-[10px] border-2 border-[#CCF575] text-[#CCF575] hover:bg-[#CCF575] hover:text-[#1f1f1f] transition-all duration-300">
  Connecting People With Technology
</button>

      )}
    </nav>
  );
};

export default Navbar;
