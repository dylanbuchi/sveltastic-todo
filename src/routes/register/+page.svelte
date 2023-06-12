<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '@/components/Spinner.svelte';
	import { isDarkMode } from '@/store/theme.store';
	$: errorMessage = '';
	$: isLoading = false;

	let name = '';
	let email = '';
	let password = '';

	$: {
		if (name || email || password) {
			errorMessage = '';
		}
	}
</script>

{#if isLoading}
	<Spinner />
{/if}

<div class:card-dark={$isDarkMode} class="card container px-6 py-3 my-3">
	<h1 class:text-dark={$isDarkMode} class="title is-4">Create an account</h1>
	<form
		method="POST"
		use:enhance={() => {
			if (isLoading) return;
			isLoading = true;

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
		{#if errorMessage}
			<div class="notification is-danger has-text-centered p-4">{errorMessage}</div>
		{/if}
		<div class="field">
			<label class:text-dark={$isDarkMode} class="label" for="name">Name</label>
			<div class="control">
				<input
					class:input-dark={$isDarkMode}
					bind:value={name}
					class="input"
					type="text"
					id="name"
					name="name"
				/>
			</div>
		</div>
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
		<div class="field">
			<div class="control">
				<input
					class:input-dark={$isDarkMode}
					disabled={isLoading || !name || !email || !password}
					class="button is-dark"
					type="submit"
					value="Register"
				/>
			</div>
		</div>
	</form>
</div>
