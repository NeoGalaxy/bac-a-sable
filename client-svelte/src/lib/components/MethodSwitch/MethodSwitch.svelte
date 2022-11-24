<script lang="ts">
	import ButtonSwitch from "./ButtonSwitch.svelte"
</script>

<div>
	<ButtonSwitch id={0} name="Méthode 1" />
	<ButtonSwitch id={1} name="Méthode 2" />
</div>

<style>
	div {
		padding: 1.5rem 0;
		display: flex;
		justify-content: center;
	}

	div :global(button:first-of-type) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	div :global(button:last-of-type) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
