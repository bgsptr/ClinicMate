import { z } from 'zod';

export const doctorSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  phoneNumber: z.string().regex(/^[0-9]{10,15}$/, {
    message:
      'Phone number must be between 10 to 15 digits and contain only numbers',
  }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
});
