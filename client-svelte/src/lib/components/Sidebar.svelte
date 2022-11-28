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

	<Filter>
		<div slot="help">
			<h1 style="margin-top: 0">Correction des biais</h1>
			<p style="margin: 0">
				Les données ont été récoltées sur un sous-ensemble de la population qui
				n’est pas parfaitement représentatif des opinions de la population
				complète. Ce biais est corrigé de la manière suivante&nbsp;: on demande
				aux votants leur vote réel à l’élection présidentielle, ce qui donne un
				premier classement des candidats. Ensuite, on récupère les résultats
				officiels de l’élection, et on compare.
			</p>
			<p style="margin-bottom: 0">
				Si un candidat a une proportion des votes plus élevée dans l’élection
				officielle, alors il est sous-représenté dans nos données. Dans le cas
				inverse, il est sur-représenté. On calcule ainsi pour chaque candidat un
				coefficient qui permet de redresser les données, et de faire en sorte
				que celles-ci soient plus représentatives de l’avis global de la
				population.
			</p>
		</div>

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
				<div slot="help" class="help">
					<h1 style="margin-top: 0">{ranking.methodName}</h1>
					<p style="margin: 0">{ranking.description}</p>
				</div>

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

	.rankings div:not(.help) {
		display: flex;
		gap: 1rem;
		font-weight: 600;
		color: var(--primary);
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
