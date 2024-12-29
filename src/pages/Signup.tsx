import Navbar from "@/components/Navbar";
import styled from "styled-components";
import Signup_form from "@/components/Signup_form";
import Signup_image from "@/components/Signup_image";

const Signup = () => {
  return (
    <>
      <Navbar />
      <StyledSignup>
        <Signup_form/>
        <Signup_image/>
      </StyledSignup>
    </>
  );
};

const StyledSignup = styled.div`
    padding: 10vh 0 0 0;
    display: flex;
    justify-content: space-between;
    background-color: #141414;
    height: 100vh;

    @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    justify-content: start;
    padding: 2vh 0 0 0;
  }

`;

export default Signup;
