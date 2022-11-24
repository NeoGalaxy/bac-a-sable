<script lang="ts">
	import Help from "./Help.svelte"

	export let help: string
</script>

<div>
	<slot />
	<Help {help} />
</div>

<style>
	div {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}
</style>
