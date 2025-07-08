import { z } from "zod";

export const regionSchema = z.object({
  name: z.string().trim().nonempty(),
});

