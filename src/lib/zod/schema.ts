import { z } from 'zod'

export const authSchema = z.object({
	username: z.string(),
	password: z.string(),
	isAdmin: z.boolean(),
})


export const adminSchema = z.object({
	username: z.string(),
	password: z.string(),
	isAdmin: z.boolean(),
})

