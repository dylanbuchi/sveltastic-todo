<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '@/components/Spinner.svelte';
	import { loginAsGuestClicked } from '@/store/app.store';
	import { isDarkMode } from '@/store/theme.store';

	$: errorMessage = '';

	$: isLoading = false;

	let email = '';
	let password = '';

	$: {
		if (email || password) {
			errorMessage = '';
		}
	}
</script>

<div class:text-dark={$isDarkMode} class:card-dark={$isDarkMode} class="card container p-6 my-3">
	<h1 class:text-dark={$isDarkMode} class="title is-4">Log in to your account</h1>
	{#if errorMessage}
		<div class="notification is-danger has-text-centered p-4">{errorMessage}</div>
	{/if}

	{#if !errorMessage && isLoading}
		<Spinner />
	{:else}
		<form
			method="POST"
			use:enhance={({ action }) => {
				if (isLoading) return;

				isLoading = true;

				$loginAsGuestClicked && (action.href = action.href + '?guest');

				return async ({ result, update }) => {
					if (result.type === 'failure') {
						isLoading = false;
						const error = result?.data?.error ?? 'Something went wrong';

						if (error === 'AUTH_INVALID_KEY_ID') {
							errorMessage = `Sorry, we couldn't find an account associated with this email.`;
						} else if (error === 'AUTH_INVALID_PASSWORD') {
							errorMessage = 'Invalid password';
						} else {
							errorMessage = error;
						}
					}
					update();
				};
			}}
		>
			<div class="field">
				<label class:text-dark={$isDarkMode} class="label" for="email">Email</label>
				<div class="control">
					<input
						class:input-dark={$isDarkMode}
						bind:value={email}
						class="input"
						type="email"
						id="email"
						name="email"
					/>
				</div>
			</div>
			<div class="field">
				<label class:text-dark={$isDarkMode} class="label" for="password">Password</label>
				<div class="control">
					<input
						class:input-dark={$isDarkMode}
						bind:value={password}
						class="input"
						type="password"
						id="password"
						name="password"
					/>
				</div>
			</div>
			<div class="field is-flex is-align-items-center is-justify-content-space-between">
				<div class="control">
					<input
						disabled={isLoading || !email || !password}
						class="button is-dark"
						type="submit"
						value="Log in"
					/>
				</div>
				<div>or</div>
				<div class="control">
					<input
						disabled={isLoading}
						on:click={() => ($loginAsGuestClicked = true)}
						class="button is-link"
						type="submit"
						value="Log in as Guest"
					/>
				</div>
			</div>
		</form>
	{/if}
</div>

<style>
</style>
