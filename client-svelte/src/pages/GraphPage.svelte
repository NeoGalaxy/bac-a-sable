<script lang="ts">
	import MultiGraph from "../lib/components/MultiGraph.svelte"
	import Sidebar from "../lib/components/Sidebar.svelte"
	import { correction, dataByCandidate } from "../lib/data"
	import { filters } from "../lib/stores"

	$: correctedData = $filters.biasCorrection
		? dataByCandidate.map(({ name, color, data }) => {
				return {
					name,
					color,
					data: data.map(({ methodId, value }) => {
						return {
							methodId,
							value: value * correction.find((c) => c.name === name).value,
						}
					}),
				}
		  })
		: dataByCandidate
</script>

<main>
	<Sidebar />
	<div class="graph">
		{#if $filters.comparison === 0}
			<MultiGraph dataByCandidate={correctedData} />
		{:else}
			<!-- bigraph -->
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 20rem 1fr;
	}

	.graph {
		display: flex;
		justify-content: center;
	}
</style>
