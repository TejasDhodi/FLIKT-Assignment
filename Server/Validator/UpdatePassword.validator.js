const z = require('zod');

const updatePasswordValidatorSchema = z.object({
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be of atleast 8 character" })
        .max(15, { message: "Password should not be more than 15 character" })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
            message: "Password must contain at least one special character",
        }),

    newPassword: z
        .string({ required_error: "New Password is required" })
        .trim()
        .min(8, { message: "New Password must be of atleast 8 character" })
        .max(15, { message: "New Password should not be more than 15 character" })
        .refine((value) => /[A-Z]/.test(value), {
            message: "New Password must contain at least one uppercase letter",
        })
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
            message: "New Password must contain at least one special character",
        }),
});

module.exports = updatePasswordValidatorSchema;