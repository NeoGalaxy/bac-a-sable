<script lang="ts">
	import Checkbox from "./Checkbox.svelte"
	import Filter from "./Filter.svelte"
	import { filters } from "../stores"
	import MethodSwitch from "./MethodSwitch/MethodSwitch.svelte"
	import { rankings } from "../data"
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
		{#each rankings as ranking, i}
			<Filter help={ranking.description}>
				<Checkbox
					bind:checked={$filters.methods[i]}
					label={ranking.methodName}
					name={ranking.methodId}
					disabled={$filters.methods[i] &&
						$filters.methods.filter((v) => v).length === 1}
				/>
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
</style>
