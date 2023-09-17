import { redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/auth.js'

export async function load({ locals }) {
	const { user } = await locals.auth.validateUser()
	if (!user) throw redirect(302, '/login')
	// console.log(auth.updateUserAttributes(user.userId, { username: 'Stephanos ' })) // todo[] call this function from form on frontend
	return { user }
}



