import * as z from "zod";



export const registerUserSchema = z
	.object({
		email: z.string().trim().email({ message: "Enter a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" }),
		re_password: z.string().min(8, {
			message: "Confirm Password must be at least 8 characters long",
		}),
	})
	.refine((data) => data.password === data.re_password, {
		message: "Passwords do not match",
		path: ["re_password"],
	});

export type TRregisterUserSchema = z.infer<typeof registerUserSchema>;