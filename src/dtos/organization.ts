import z from 'zod';

const addOrganization = z.object({
    name: z.string().min(1),
    country: z.string().min(1),
    type: z.string().refine(value => value === 'Limited Company' || value === 'Joint Stock Company' || value === 'Other', {
        message: 'Gender must be Limited Company, Joint Stock Company, or Other',
    })
});

export type TAddOrganization = z.infer<typeof addOrganization>;