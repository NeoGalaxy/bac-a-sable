<script lang="ts">
	import Checkbox from "./Checkbox.svelte"
	import Filter from "./Filter.svelte"
	import { filters } from "../stores"
	import MethodSwitch from "./MethodSwitch/MethodSwitch.svelte"
	import { rankings } from "../data"
	import DoubleRadio from "./DoubleRadio.svelte"
</script>

<div class="sidebar">
	<h1>Comparaison des méthodes de scrutin</h1>

	<Filter help="Explication de la correction des biais">
		<Checkbox
			bind:checked={$filters.biasCorrection}
			label="Corriger les biais"
			name="biasCorrection"
		/>
	</Filter>

	<MethodSwitch />

	<div class="rankings">
		{#if $filters.comparison === 1}
			<div>
				<p>x</p>
				<p>y</p>
				<p>scrutin</p>
			</div>
		{/if}

		{#each rankings as ranking, i}
			<Filter help={ranking.description}>
				{#if $filters.comparison === 0}
					<Checkbox
						bind:checked={$filters.methods[i]}
						label={ranking.methodName}
						name={ranking.methodId}
						disabled={$filters.methods[i] &&
							$filters.methods.filter((v) => v).length === 1}
					/>
				{:else}
					<DoubleRadio
						label={ranking.methodName}
						name={ranking.methodId}
						index={i}
					/>
				{/if}
			</Filter>
		{/each}
	</div>
</div>

<style>
	.sidebar {
		padding: 0 1rem;
	}

	h1 {
		font-size: 1.5rem;
		color: var(--primary);
	}

	.rankings {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.rankings div {
		display: flex;
		gap: 1rem;
		font-weight: 600;
	}

	.rankings div p {
		text-align: center;
		margin: 0;
		width: 0.9rem;
	}

	.rankings div p:last-of-type {
		text-align: left;
		width: initial;
	}
</style>
