import { fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { auth } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'

export async function load({ locals }) {
	const { user } = await locals.auth.validateUser()
	if (!user) throw redirect(302, '/login')

	const form = await superValidate(user, authSchema)

	// console.log(auth.updateUserAttributes(user.userId, { username: 'Stephanos ' })) // todo[] call this function from form on frontend
	return { user, form }
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
