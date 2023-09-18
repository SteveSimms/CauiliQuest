import { fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { auth } from '$lib/server/auth'
import { authSchema, adminSchema } from '$lib/zod/schema'
import { Prisma } from '@prisma/client'

import { PrismaClient } from '@prisma/client'

import { TINYMCE_API_KEY as CMS } from '$env/static/private'

const prisma = new PrismaClient()

export async function load({ locals }) {
	const { user } = await locals.auth.validateUser()
	const combinedSchema = authSchema.merge(adminSchema)
	if (!user?.isAdmin) throw redirect(302, '/login')

	const users = await prisma.authUser.findMany({})
	console.log('USERS', users)
	console.log('ADMIN STATUS', user)

	const form = await superValidate(user, combinedSchema)

	return { user,users, form, CMS }
}


export const actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, authSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const { user } = await locals.auth.validateUser()
			console.log('User actions', user)
			if (!user?.userId) {
				// Handle the case when user is null
				return fail(400, { error: 'User not found' })
			} else {
				// Update the user details here
				const userToUpdate = await auth.updateUserAttributes(user.userId, {
					username: form.data.username,
				})
				console.log('SERVER', userToUpdate.username)
				// Do something with userToUpdate
				return { user: userToUpdate, form }
			}
		} catch (error) {
			// Handle the error
			return setError(form, 'username', 'Username already in use')
		}
	},
}
