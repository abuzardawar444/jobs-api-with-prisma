import { z, ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "name must be atleast 3 charecters")
    .max(10, "Name must be only 10 charecters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(3, "Password must be atleast 3 charecters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email type"),
  password: z.string().min(3, "password must be atleast 3 charecters."),
});

// export function validateWithZodSchema<T>(
//   schema: ZodSchema<T>,
//   data: unknown
// ): T {
//   const results = schema.safeParse(data);
//   if (!results.success) {
//     const errors = results.error?.errors.map((err) => err.message);
//     throw new BadRequestError(errors?.join(","));
//   }
//   return results.data;
// }

export const validateWithZodSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const results = schema.safeParse(req.body);
    if (!results.success) {
      const errors = results.error.errors.map((error) => error.message);
      res.status(StatusCodes.BAD_REQUEST).json({ error: errors.join(",") });
      return;
    }
    return next();
  };
