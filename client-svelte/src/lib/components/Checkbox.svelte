<script lang="ts">
	import { hoveredBar } from "../stores"

	export let checked: boolean
	export let label: string
	export let name: string
	export let disabled = false
</script>

<div>
	<input type="checkbox" bind:checked {disabled} {name} id={name} on:change />
	<label
		for={name}
		style={$hoveredBar && $hoveredBar.methodId === name
			? `color: ${$hoveredBar.color}; font-weight: 600`
			: ""}
	>
		{label}
	</label>
</div>

<style>
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	input {
		--size: 0.9rem;
		appearance: none;
		width: var(--size);
		height: var(--size);
		background: transparent;
		border: 2px solid var(--primary);
		border-radius: 20%;
		cursor: pointer;
	}

	input:checked {
		background: var(--primary);
	}

	input:disabled {
		background: grey;
	}

	label {
		transition: color 0.15s ease-in-out;
	}
</style>
