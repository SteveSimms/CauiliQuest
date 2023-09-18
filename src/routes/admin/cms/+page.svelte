<script lang="ts">
		import { superForm } from 'sveltekit-superforms/client'
		import { page } from '$app/stores'
		import Editor from '@tinymce/tinymce-svelte';
		// import tinymce from 'tinymce/tinymce';
	// import { actions } from './+page.server.js'
	export const prerender = false;




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
	const save = 'mcesave'
	
// activeEditor?.execCommand(save);

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
	<h1>Admin CMS</h1>
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

	<Editor cssClass="bg-black"
	apiKey={data.CMS}
	conf={cmsConfig}
	bind:value={cmsContent}
	on:input={(event) => cmsContent = event.detail}

/>
<button class="btn variant-filled" on:click={saveContent}>Save Content</button>

<button class="btn variant-filled" type="submit">Save Username</button>
</form>



{#each data.users as users }
		<li class="">{users.username}</li>
{/each}


{@html cmsContent}

</div>



<!-- todo[] add an "async-data-table" that has client-side pagination and server-side pagination actions https://www.skeleton.dev/elements/lists -->
<!-- todo[] add drawer triggered by listAction https://www.skeleton.dev/utilities/drawers -->
<!-- todo[] add image upload and crud to support admin/profile edit fx to authUser and authSchema https://www.skeleton.dev/components/file-buttons-->

<!-- todo[in progress] add wysywig editor to support admin/profile edit fx to authUser and authSchema https://www.tiny.cloud/my-account/dashboard/ its literally a svelte component self hosted: https://www.tiny.cloud/docs/tinymce/6/bundle-spelling-container/#procedure -->

<!-- todo[] maybe add chat to the admin page? https://www.skeleton.dev/elements/chat -->