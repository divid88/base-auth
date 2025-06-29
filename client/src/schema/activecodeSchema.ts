import * as z from "zod";

export const AciveCodeSchema = z.object({
	otp: z.string().max(6,
        { message: "Code must be equal 6" }),
        email: z.string().trim().email({ message: "Enter a valid email address" }),
	
});

export type TAciveCodeSchema = z.infer<typeof AciveCodeSchema>;