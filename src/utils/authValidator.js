import * as Yup from "yup";

// Common schemas
const emailSchema = Yup.string()
  .trim()
  .email("Invalid email address")
  .required("Email is required");

const passwordSchema = Yup.string()
  .trim()
  .min(5, "Password must be at least 5 characters")
  .required("Password is required");

//Registration schema
const registrationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: emailSchema,
  password: passwordSchema,
});

//Login Schema
const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export { registrationSchema, loginSchema };
