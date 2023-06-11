<script lang="ts">
	import { enhance } from '$app/forms';
	import { APP_NAME } from '@/utils/constants/app.constants';
	import type { User } from 'lucia-auth';

	export let user: User | undefined;
	let isLoading = false;
</script>

<nav class="navbar is-flex is-justify-content-space-between" aria-label="main navigation">
	<div class="navbar-brand navbar-start">
		<div class="navbar-item">
			<h1 class="title is-4">{APP_NAME}</h1>
		</div>
	</div>

	<div class="navbar-item">
		<div class="buttons">
			{#if user}
				<form
					use:enhance={() => {
						if (isLoading) return;
						isLoading = true;
						return async ({ update }) => {
							update();
							isLoading = false;
						};
					}}
					method="POST"
					action="?/logout"
				>
					<input
						disabled={isLoading}
						class="button is-light is-hoverable"
						type="submit"
						value="Log out"
					/>
				</form>
			{:else}
				<a href="/login" class="button is-light is-hoverable"> Log in </a>
				<a href="/register" class="button is-primary is-hoverable">
					<strong>Sign up</strong>
				</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav {
		border-bottom: 1px rgba(91, 91, 91, 0.345) solid;
	}
</style>
