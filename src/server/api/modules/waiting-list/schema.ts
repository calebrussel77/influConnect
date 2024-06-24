import { z } from 'zod';

export type CreateWaitingListSubscriptionInput = z.infer<
  typeof createWaitingListSubscriptionSchema
>;
export const createWaitingListSubscriptionSchema = z.object({
  name: z
    .string({ required_error: 'Le nom est requis' })
    .min(1, 'Le nom est requis'),
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email({ message: "cette adresse email n'est pas valide" })
    .min(1),
});
