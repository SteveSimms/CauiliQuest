<script lang="ts">
		import { superForm } from 'sveltekit-superforms/client'

	export let data

	const { form, errors, constraints, enhance } = superForm(data.form)

	console.log('Updated Username',data.user.username)
</script>

<div class="card m-auto mt-16 max-w-md p-8">
	<h1>Profile</h1>
	<p class="mt-4 capitalize">Welcome, {data.user.username}!</p>
<form method="POST" class="mt-8 space-y-8"  use:enhance>
	<label class="label" for="username">
		<span class="block">Username</span>
		<input 
				class="input" 
				type="text" 
				name="username" 
				id="username" 
				class:input-error={$errors.username}
				aria-invalid={$errors.username ? 'true' : undefined}
				bind:value={$form.username}
				{...$constraints.username}
				>

	</label>


<button class="btn variant-filled" type="submit">Save Username</button>
</form>

</div>
