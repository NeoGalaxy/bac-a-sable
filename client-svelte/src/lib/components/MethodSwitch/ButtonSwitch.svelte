<script lang="ts">
	import { filters } from "../../stores"

	export let id: number
	export let name: string

	function onClick() {
		$filters.comparison = id
	}
</script>

<button class:active={$filters.comparison === id} on:click={onClick}>
	{name}
</button>

<style>
	button {
		display: inline-block;
		outline: 0;
		cursor: pointer;
		border: none;
		padding: 0 1rem;
		line-height: 45px;
		border-radius: var(--radius);
		font-size: 16px;
		background: #fff;
		color: var(--primary);
		box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
		transition: background-color 0.2s ease, color 0.2s ease,
			box-shadow 0.2s ease;
	}

	button:not(.active):hover {
		box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
	}

	.active {
		background: var(--primary);
		color: #fff;
	}
</style>
