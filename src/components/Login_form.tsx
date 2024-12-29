import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uri } from "@/Constant";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
};

const Login_form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(`${uri}login`, data, {
        withCredentials: true,
      });
      if (response) {
        toast.success(response.data.message);
        if (response.status === 200) {
          navigate("/Products");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="lg:p-[5vh_10%_0_0] p-[0vh_10%_5vh_5%]">
      <ToastContainer />
      <div className="hidden lg:block">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h2 className="text-white text-2xl md:text-3xl mb-2 mt-6">Let the journey begin</h2>
      <p className="text-[#b8b8b8] mb-4">
        This is a basic login page used for demonstration purposes.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white" htmlFor="email">
          Enter your email
        </label>
        <br />
        <input
          className="bg-[#1f1f1f] w-full p-3 rounded-md mt-2 mb-1"
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter Email ID"
        />
        <br />
        <p className="mb-4 text-[#b8b8b8] text-sm">
          This email will be used in the app
        </p>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label className="text-white" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="bg-[#1f1f1f] w-full p-3 rounded-md mt-2 mb-8"
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter the password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <div className="flex gap-4">
          <input
            className="bg-[#1f1f1f] p-[6px_15px_6px_15px] rounded-md text-[#CCF575] text-sm"
            type="submit"
            value="Login now"
          />
          <div className="mt-2">
            <span className="text-[#6e6a6a] ml-4">Forgot password?</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login_form;
