function Validation(formData) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
  const numbers_pattern = /^[0-9]$/;

  if (formData.name === "") {
    error.name = "El nombre no debe estar vacío";
  } else {
    error.name = "";
  }

  if (formData.lastname === "") {
    error.lastname = "El apellido no debe estar vacío";
  } else {
    error.lastname = "";
  }

  if (formData.address === "") {
    error.address = "La dirección no debe estar vacía";
  } else {
    error.address = "";
  }

  if (formData.phonenumber === "") {
    error.phonenumber = "El teléfono no debe estar vacío";
  } else if (!numbers_pattern.test(formData.phonenumber)) {
    error.phonenumber = "El teléfono debe contener solo números";
  } else {
    error.phonenumber = "";
  }

  if (formData.dni === "") {
    error.dni = "El DNI no debe estar vacío";
  } else if (!numbers_pattern.test(formData.dni)) {
    error.dni = "El DNI debe contener solo números";
  } else if (formData.dni.length !== 8) {
    error.dni = "El DNI debe contener 8 números";
  } else {
    error.dni = "";
  }

  if (formData.email === "") {
    error.email = "El correo no debe estar vacío";
  } else if (!email_pattern.test(formData.email)) {
    error.email = "El correo no coincide";
  } else {
    error.email = "";
  }

  if (formData.password === "") {
    error.password = "La contraseña no debe estar vacía";
  } else if (!password_pattern.test(formData.password)) {
    error.password =
      "La contraseña debe contener entre 8 a 16 caracteres y al menos una mayúscula, un caracter especial y un número.";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
