<script lang="ts">
	import Help from "./Help.svelte"

	export let help: string = undefined
</script>

<div>
	<slot />
	<Help>
		<slot name="help">{help}</slot>
	</Help>
</div>

<style>
	div {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}
</style>
