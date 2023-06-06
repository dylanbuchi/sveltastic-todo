<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container py-4">
	<h1 class="title is-4">Log in to your account</h1>
	<form method="POST" use:enhance>
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
				<input class="button is-primary" type="submit" value="Login" />
			</div>
		</div>
	</form>
</div>
