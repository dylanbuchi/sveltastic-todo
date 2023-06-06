<script lang="ts">
	import Footer from '@/components/Footer.svelte';
	import Navbar from '@/components/Navbar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: user = data.user;
</script>

<main class="is-flex is-flex-direction-column">
	<Navbar {user} />
	<div class="container is-flex-grow-1">
		<slot />
	</div>
	<Footer />
</main>

<style>
	main {
		min-height: 100vh;
	}

	.container {
		flex-grow: 1;
	}
</style>
