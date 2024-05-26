import { z } from 'zod';

export type CreateWaitingListSubscriptionInput = z.infer<
  typeof createWaitingListSubscriptionSchema
>;
export const createWaitingListSubscriptionSchema = z.object({
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email({ message: "cette adresse email n'est pas valide" })
    .min(1),
});
