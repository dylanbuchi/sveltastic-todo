<script lang="ts">
	import { APP_NAME } from '../utils/constants/app.constants';

	let currentYear = new Date().getFullYear();
</script>

<footer class="footer py-5">
	<div class="content has-text-centered">
		<p>{APP_NAME} &copy; {currentYear} All rights reserved.</p>
	</div>
</footer>

<style>
	footer {
		background-color: rgb(234, 231, 228);
	}
</style>
