import Navbar from "@/components/Navbar";
import styled from "styled-components";
import Login_form from "@/components/Login_form";
import Login_slider from "@/components/Login_slider";

const Login = () => {
  return (
    <>
      <Navbar />
      <StyledLogin>
        <Login_slider />
        <Login_form />
      </StyledLogin>
    </>
  );
};

const StyledLogin = styled.div`
  padding: 10vh 0 0 0;
  display: flex;
  justify-content: space-between;
  gap: 4%;
  background-color: #141414;
  height: 100vh;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: start;
    
    padding: 2vh 0 0 0;
  }
`;

export default Login;
