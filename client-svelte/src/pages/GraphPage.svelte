<script lang="ts">
	import MultiGraph from "../lib/components/MultiGraph.svelte"
	import Sidebar from "../lib/components/Sidebar.svelte"
	import TempGraph from "../lib/components/TempGraph.svelte"
	import { filters } from "../lib/stores"
</script>

<main>
	<Sidebar />
	<div class="graph">
		{#if $filters.comparison === 0}
			<MultiGraph />
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
</style>
