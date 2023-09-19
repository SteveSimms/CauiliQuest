<script lang="ts">
	import Heading from './heading.svelte'
	import '../app.postcss'


	import { Drawer, initializeStores } from '@skeletonlabs/skeleton';
	import type { AnyRecord, AnySoaRecord } from 'dns'

	initializeStores();

	let authUser = true
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	// import '@skeletonlabs/skeleton/styles/all.css'





	


</script>

<svelte:head>
	<title>CauliQuest</title>
	<link rel="icon" href="https://fav.farm/🔥" />
</svelte:head>
<Drawer>
{#if authUser}

	<p>Form will go here</p>

{/if}





</Drawer>
<!-- <Drawer /> -->

<!-- <AppShell>...</AppShell> -->

<Heading />

<slot />
