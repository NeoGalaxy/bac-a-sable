<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte"
	import { filters } from "$lib/stores"
</script>

<main>
	<Sidebar />
	<div class="graph">
		graphe méthode {$filters.comparison + 1}, biais
		{$filters.biasCorrection ? "" : "non"} corrigés
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
