<script lang="ts">
	import Footer from '@/components/Footer.svelte';
	import Navbar from '@/components/Navbar.svelte';

	import type { LayoutData } from './$types';
	import { isDarkMode } from '@/store/theme.store';

	export let data: LayoutData;
	$: user = data.user;
</script>

<main class:darker={$isDarkMode} class:bg={!$isDarkMode} class="is-flex is-flex-direction-column">
	<Navbar {user} />
	<div class="container is-flex-grow-1">
		<slot />
	</div>
	<Footer />
</main>

<style>
	.bg {
		background-color: rgb(244, 238, 230);
	}
	main {
		min-height: 100vh;
	}

	.container {
		flex-grow: 1;
	}
</style>
