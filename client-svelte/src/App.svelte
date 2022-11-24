<script lang="ts">
	import NavBar from "./lib/components/NavBar.svelte"
	import GraphPage from "./GraphPage.svelte"
	import ReportPage from "./ReportPage.svelte"

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
