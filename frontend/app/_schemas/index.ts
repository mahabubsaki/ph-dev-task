import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),

});


const loginSchema = z.object({
  loginEmail: z.string().email({
    message: "Invalid email address.",
  }),
  loginPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),

});

export { signUpSchema, loginSchema };
