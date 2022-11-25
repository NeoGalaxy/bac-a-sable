<script lang="ts">
	import NavBar from "./lib/components/NavBar.svelte"
	import GraphPage from "./pages/GraphPage.svelte"
	import ReportPage from "./pages/ReportPage.svelte"

	let showReport = false
</script>

<NavBar
	on:showReportPage={() => (showReport = true)}
	on:showGraphPage={() => (showReport = false)}
/>

{#if showReport}
	<ReportPage />
{:else}
	<GraphPage />
{/if}
