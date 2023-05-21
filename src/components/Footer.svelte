<script lang="ts">
	import { onMount } from 'svelte';
	import { APP_NAME } from '../utils/constants/app.constants';

	let currentYear: number;

	onMount(() => (currentYear = new Date().getFullYear()));
</script>

<footer class="footer p-6">
	<div class="content has-text-centered">
		<p>{APP_NAME} &copy; {currentYear} All rights reserved.</p>
	</div>
</footer>
