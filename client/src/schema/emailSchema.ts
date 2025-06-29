import * as z from "zod";

export const emailSchema = z.object({

        email: z.string().trim().email({ message: "Enter a valid email address" }),
	
});

export type TemailSchema = z.infer<typeof emailSchema>;