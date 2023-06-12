<script lang="ts">
	import { isDarkMode } from '@/store/theme.store';
	import { APP_NAME } from '../utils/constants/app.constants';

	let currentYear = new Date().getFullYear();
</script>

<footer class:dark={$isDarkMode} class:bg={!$isDarkMode} class="footer py-5">
	<div class="content has-text-centered">
		<p>{APP_NAME} &copy; {currentYear} All rights reserved.</p>
	</div>
</footer>

<style>
	.bg {
		background-color: rgb(236, 230, 224);
	}
</style>
