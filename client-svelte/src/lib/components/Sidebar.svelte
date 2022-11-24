<script lang="ts">
	import Checkbox from "./Checkbox.svelte"
	import Filter from "./Filter.svelte"
	import { filters } from "../stores"
	import MethodSwitch from "./MethodSwitch/MethodSwitch.svelte"
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
</div>

<style>
	.sidebar {
		grid-area: "sidebar";
		padding: 0 1rem;
		border-right: 3px solid var(--primary);
	}

	h1 {
		font-size: 1.5rem;
		color: var(--primary);
	}
</style>
