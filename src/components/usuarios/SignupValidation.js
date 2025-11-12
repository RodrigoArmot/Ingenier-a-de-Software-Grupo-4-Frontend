function Validation(formData) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
  const numbers_pattern = /^[0-9]+$/;

  if (!formData.name.trim()) {
    error.name = "El nombre no debe estar vacío";
  }

  if (!formData.lastname.trim()) {
    error.lastname = "El apellido no debe estar vacío";
  }

  if (!formData.address.trim()) {
    error.address = "La dirección no debe estar vacía";
  }

  // Teléfono
  const phone = String(formData.phonenumber || "").trim();
  if (!phone) {
    error.phonenumber = "El teléfono no debe estar vacío";
  } else if (!numbers_pattern.test(phone)) {
    error.phonenumber = "El teléfono debe contener solo números";
  }

  // DNI
  const dni = String(formData.dni || "").trim();
  if (!dni) {
    error.dni = "El DNI no debe estar vacío";
  } else if (!numbers_pattern.test(dni)) {
    error.dni = "El DNI debe contener solo números";
  } else if (dni.length !== 8) {
    error.dni = "El DNI debe contener 8 números";
  }

  // Email
  if (!formData.email.trim()) {
    error.email = "El correo no debe estar vacío";
  } else if (!email_pattern.test(formData.email)) {
    error.email = "El correo no coincide";
  }

  // Password
  if (!formData.password) {
    error.password = "La contraseña no debe estar vacía";
  } else if (!password_pattern.test(formData.password)) {
    error.password =
      "La contraseña debe contener entre 8 a 16 caracteres y al menos una mayúscula, un caracter especial y un número.";
  }

  return error;
}

export default Validation;
