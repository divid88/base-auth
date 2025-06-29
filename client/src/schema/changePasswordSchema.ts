import * as z from "zod";



export const changePasswordSchema = z
	.object({
		
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" }),
		re_password: z.string().min(8, {
			message: "Confirm Password must be at least 8 characters long",
		}),
	})
	.refine((data) => data.password === data.re_password, {
		message: " پسورد یکسان نیستن ",
		path: ["re_password"],
	});

export type TchangePasswordSchema = z.infer<typeof changePasswordSchema>;
