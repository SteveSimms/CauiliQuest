<script lang="ts">
		import { superForm } from 'sveltekit-superforms/client'
		import { page } from '$app/stores'
		import Editor from '@tinymce/tinymce-svelte';
	// import { actions } from './+page.server.js'
	




	export let data
	$: users = data.users


	$: cmsContent = ''
	let cmsConfig = {
  "height": 500,
  "plugins": [
      "a11ychecker","advlist","advcode","advtable","autolink","checklist","export",
      "lists","link","image","charmap","preview","anchor","searchreplace","visualblocks",
      "powerpaste","fullscreen","formatpainter","insertdatetime","media","table","help","wordcount","save"
    ],
   "toolbar": `undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify |  
      "bullist numlist checklist outdent indent | removeformat | code table help | save 
    ` 
}

	// console.log('CLIENT', data.users)
	const { form, errors, constraints, enhance } = superForm(data.form)

	// console.log('Updated Username', data.user.username)


	const saveContent = async  () => {
		// const save = 'mcesave'
	
		// 	tinymce.activeEditor?.execCommand(save);

// const response = await actions.saveContent( cmsContent )
// if (response.ok) {
//       // Handle success
//       console.log('Content saved successfully');
//     } else {
//       // Handle error
//       console.error('Failed to save content');
//     }

 	}
	// console.log('actions',actions.saveContent)
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


<div class="w-full text-token card p-4 space-y-4 mt-5">
{#each data.users as users, i }

		<ol class="list">
			<li>
				<span class="badge-icon p-4 variant-soft-primary">{i + 1}</span>
				<span class="flex-auto">
				{users.username}
				</span>
				<span>⋮</span>


			</li>

		</ol>
{/each}

</div>


{@html cmsContent}
<a class="mt-2" href="/admin/cms">CMS</a>
</div>


<!-- todo[] add an "async-data-table" that has client-side pagination and server-side pagination actions https://www.skeleton.dev/elements/lists -->
<!-- todo[] add drawer triggered by listAction https://www.skeleton.dev/utilities/drawers -->
<!-- todo[] add image upload and crud to support admin/profile edit fx to authUser and authSchema https://www.skeleton.dev/components/file-buttons-->

<!-- todo[in progress] add wysywig editor to support admin/profile edit fx to authUser and authSchema https://www.tiny.cloud/my-account/dashboard/ its literally a svelte component self hosted: https://www.tiny.cloud/docs/tinymce/6/bundle-spelling-container/#procedure -->

<!-- todo[] maybe add chat to the admin page? https://www.skeleton.dev/elements/chat -->