<script lang="ts">
	import MultiGraph from "../lib/components/MultiGraph.svelte"
	import BiGraph from "../lib/components/BiGraph.svelte"
	import Sidebar from "../lib/components/Sidebar.svelte"
	import { candidates, dataByCandidate, dataByMethod } from "../lib/data"
	import { filters } from "../lib/stores"

	$: correctedDataByCandidate = $filters.biasCorrection
		? dataByCandidate.map(({ name, color, data }) => {
				return {
					name,
					color,
					data: data.map(({ methodId, value }) => {
						return {
							methodId,
							value: value * candidates.find((c) => c.name === name).correction,
						}
					}),
				}
		  })
		: dataByCandidate

	$: correctedDataByMethod = $filters.biasCorrection
		? dataByMethod.map(
				({ methodId, methodName, description, results, unit }) => {
					return {
						methodId,
						methodName,
						description,
						unit,
						results: results.map(({ name, value }) => {
							return {
								name,
								value:
									value * candidates.find((c) => c.name === name).correction,
							}
						}),
					}
				}
		  )
		: dataByMethod
</script>

<main>
	<Sidebar />
	<div class="graph">
		{#if $filters.comparison === 0}
			<MultiGraph dataByCandidate={correctedDataByCandidate} />
		{:else}
			<BiGraph
				{candidates}
				dataX={correctedDataByMethod[$filters.methods2[0]]}
				dataY={correctedDataByMethod[$filters.methods2[1]]}
			/>
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
