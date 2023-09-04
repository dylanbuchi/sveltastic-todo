<script lang="ts">
	import { enhance } from '$app/forms';
	import { APP_NAME } from '@/utils/constants/app.constants';
	import type { User } from 'lucia';
	import { isDarkMode } from '@/store/theme.store';
	import Spinner from './Spinner.svelte';
	import 'iconify-icon';
	import { page } from '$app/stores';

	export let user: User | undefined;
	let isLoading = false;

	$: currentRoute = $page.url.pathname;
</script>

{#if isLoading}
	<Spinner />
{/if}

<nav
	class:navbar-dark={$isDarkMode}
	class:bg={!$isDarkMode}
	class="navbar is-flex is-justify-content-space-between"
	aria-label="main navigation"
>
	<div class="navbar-brand navbar-start">
		<div class="navbar-item">
			<h1 class:text-dark={$isDarkMode} class="title is-4">{APP_NAME}</h1>
		</div>
	</div>

	<div class="navbar-item">
		<div class="buttons">
			<button
				class="button is-hoverable"
				class:text-dark={$isDarkMode}
				class:is-dark={$isDarkMode}
				on:click={() => isDarkMode.toggle()}
			>
				{#if $isDarkMode}
					<iconify-icon icon="ph:sun-bold" />
				{:else}
					<iconify-icon icon="ph:moon-bold" />
				{/if}
			</button>

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
						class="button is-dark is-hoverable"
						type="submit"
						value="Log out"
					/>
				</form>
			{:else if currentRoute === '/login'}
				<a href="/register" class="button is-link is-hoverable register">
					<strong>Sign up</strong>
				</a>
			{:else}
				<a href="/login" class="button is-link is-hoverable"><strong>Log in</strong></a>
			{/if}
		</div>
	</div>
</nav>

<style>
	.bg {
		border-bottom: 1px rgba(91, 91, 91, 0.345) solid;
		background-color: rgb(255, 255, 255);
	}
</style>
