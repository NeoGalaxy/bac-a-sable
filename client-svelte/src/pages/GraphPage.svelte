<script lang="ts">
	import Sidebar from "../lib/components/Sidebar.svelte"
	import TempGraph from "../lib/components/TempGraph.svelte"
	import { filters } from "../lib/stores"
</script>

<main>
	<Sidebar />
	<div class="graph">
		<p>
			graphe méthode {$filters.comparison + 1}, biais
			{$filters.biasCorrection ? "" : "non"} corrigés
		</p>
		<p>
			{$filters.methods}
		</p>
		<TempGraph />
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 20rem 1fr;
		grid-template-areas: "sidebar content";
	}

	.graph {
		grid-area: "content";
	}
</style>
