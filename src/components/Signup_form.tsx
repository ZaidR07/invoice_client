import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { uri } from "@/Constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

const Signup_form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(`${uri}register`, data, {
        withCredentials: true,
      });
      if (response) {
        toast(response.data.message);
        if (response.status == 200) {
          navigate("/Products");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-[5vh_5%_0_5%]">
      <ToastContainer />
      <h2 className="text-white text-2xl md:text-3xl mb-2">Sign up to begin your journey</h2>
      <p className="text-[#b8b8b8] mb-4">
        This is a basic signup page used for demonstration purposes.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white" htmlFor="email">
          Enter your email
        </label>
        <br />
        <input
          className="bg-[#1f1f1f] w-full p-2 rounded-md mt-2 mb-1"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address", // Custom error message for invalid email format
            },
          })}
          placeholder="Enter Email ID"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <p className="mb-4 text-[#b8b8b8] text-sm">
          This email will be used in the app
        </p>

        <label className="text-white" htmlFor="username">
          Enter Username
        </label>
        <br />
        <input
          className="bg-[#1f1f1f] w-full p-2 rounded-md mt-2 mb-1"
          {...register("username", { required: "Username is required" })}
          placeholder="Enter Username"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <p className="mb-4 text-[#b8b8b8] text-sm">
          This username will be your identity in the app
        </p>

        <label className="text-white" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="bg-[#1f1f1f] w-full p-2 rounded-md mt-2 mb-1"
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <p className="mb-4 text-[#b8b8b8] text-sm">
          Remember this password for future use.
        </p>

        <input
          className="bg-[#1f1f1f] p-[6px_15px_6px_15px] rounded-md text-[#CCF575] text-sm"
          type="submit"
          value="Register"
        />

        <span onClick={() => navigate("/login")} className="text-[#6e6a6a] ml-4">Already have account ?</span>
      </form>
    </div>
  );
};

export default Signup_form;
