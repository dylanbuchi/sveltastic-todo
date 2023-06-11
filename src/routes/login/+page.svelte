<script lang="ts">
	import { enhance } from '$app/forms';

	$: errorMessage = '';
	$: isGuest = false;
	$: isLoading = false;
</script>

<div class="container py-4">
	<h1 class="title is-4">Log in to your account</h1>
	<form
		method="POST"
		use:enhance={({ action }) => {
			if (isLoading) return;
			isLoading = true;
			isGuest && (action.href = action.href + '?guest');

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
			<label class="label" for="email">Email</label>
			<div class="control">
				<input class="input" type="email" id="email" name="email" />
			</div>
		</div>
		<div class="field">
			<label class="label" for="password">Password</label>
			<div class="control">
				<input class="input" type="password" id="password" name="password" />
			</div>
		</div>
		<div class="field is-flex is-align-items-center is-justify-content-space-between">
			<div class="control">
				<input disabled={isLoading} class="button is-primary" type="submit" value="Log in" />
			</div>
			<div>or</div>
			<div class="control">
				<input
					disabled={isLoading}
					on:click={() => (isGuest = true)}
					class="button is-link"
					type="submit"
					value="Log in as Guest"
				/>
			</div>
		</div>
	</form>
</div>
