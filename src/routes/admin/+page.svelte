<script lang="ts">
		import { superForm } from 'sveltekit-superforms/client'
		import { page } from '$app/stores'



	export let data
	$: users = data.users

	console.log('CLIENT', data.users)
	const { form, errors, constraints, enhance } = superForm(data.form)

	console.log('Updated Username', data.user.username)
</script>

<div class="card m-auto mt-16 max-w-md p-8">
	<h1>Admin</h1>
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



{#each data.users as users }
		<li class="">{users.username}</li>
{/each}
</div>


<!-- todo[] add an "async-data-table" that has client-side pagination and server-side pagination actions https://www.skeleton.dev/elements/lists -->
<!-- todo[] add drawer triggered by listAction https://www.skeleton.dev/utilities/drawers -->
<!-- todo[] add image upload and crud to support admin/profile edit fx to authUser and authSchema https://www.skeleton.dev/components/file-buttons-->

<!-- todo[] add wysywig editor to support admin/profile edit fx to authUser and authSchema https://www.tiny.cloud/my-account/dashboard/ its literally a svelte component self hosted: https://www.tiny.cloud/docs/tinymce/6/bundle-spelling-container/#procedure -->

<!-- todo[] maybe add chat to the admin page? https://www.skeleton.dev/elements/chat -->