import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

function Register() {

  const [step, setstep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
    userType: ""
  })

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const handleInputData = input => e => {

    const {value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }

  switch (step) {
    case 1:
      return (

        <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
      );
    case 2:
      return (

        <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />

      );
    case 3:
      return (
        <StepThree prevStep={prevStep} values={formData}  />
      );
    default:
      return (
        <div class="register_container">
        </div>
      );
  }
}

export default Register;
