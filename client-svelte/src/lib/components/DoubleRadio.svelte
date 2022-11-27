<script lang="ts">
	import { filters } from "../stores"

	export let label: string
	export let name: string
	export let index: number

	function onChange1() {
		$filters.methods2 = [index, $filters.methods2[1]]
	}
	function onChange2() {
		$filters.methods2 = [$filters.methods2[0], index]
	}
</script>

<div>
	<input
		type="radio"
		name="method1"
		id="method1-{name}"
		checked={$filters.methods2[0] === index}
		on:change={onChange1}
	/>
	<input
		type="radio"
		name="method2"
		id="method2-{name}"
		checked={$filters.methods2[1] === index}
		on:change={onChange2}
	/>
	<span>{label}</span>
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
		border-radius: 100%;
		cursor: pointer;
	}

	input:checked {
		background: var(--primary);
	}

	input:disabled {
		background: grey;
	}
</style>
