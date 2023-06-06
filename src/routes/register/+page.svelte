<script lang="ts">
	import { enhance } from '$app/forms';
	$: errorMessage = '';
</script>

<div class="container py-4">
	<h1 class="title is-4">Create an account</h1>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
				} else if (result.type === 'failure') {
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
			<label class="label" for="name">Name</label>
			<div class="control">
				<input class="input" type="text" id="name" name="name" />
			</div>
		</div>
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
		<div class="field">
			<div class="control">
				<input class="button is-primary" type="submit" value="Register" />
			</div>
		</div>
	</form>
</div>
