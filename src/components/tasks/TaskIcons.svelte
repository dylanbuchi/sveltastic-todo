<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	type Icon = typeof SvelteComponent;

	export let action: () => void;
	export let secondaryAction: () => void;
	export let icon: Icon;
	export let secondaryIcon: Icon;
</script>

<div class="column is-narrow is-flex is-align-items-center">
	<button class="button is-link is-small mr-2" on:click={action}>
		<span class="icon is-small">
			<svelte:component this={icon} />
		</span>
	</button>
	<button class="button is-danger is-small" on:click={secondaryAction}>
		<span class="icon is-small">
			<svelte:component this={secondaryIcon} />
		</span>
	</button>
</div>
