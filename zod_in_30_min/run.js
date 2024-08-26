import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
  age: z
    .number()
    .min(0)
    .optional()
    .default(Math.round(Math.random() * 100)),
  isProgrammer: z.boolean().optional().default(false),
  hobby: z.enum(["reading", "writing", "coding"]).optional(),
});

// type User = z.infer<typeof UserSchema>;

const user = UserSchema.parse({ username: "alice" });

console.log(user);
