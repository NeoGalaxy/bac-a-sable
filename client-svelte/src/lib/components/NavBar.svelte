<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()
</script>

<nav>
	<ul>
		<li>
			<a
				on:click|preventDefault={() => dispatch("showGraphPage")}
				href="./index.html"
			>
				🗳️ Challenge Open Data
			</a>
		</li>
		<li>
			<a
				on:click|preventDefault={() => dispatch("showReportPage")}
				href="./index.html"
			>
				Rapport
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		padding: 1.2rem 2rem;
		background: var(--primary);
		color: white;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 2rem;
		align-items: baseline;
	}

	li:first-of-type {
		font-size: 1.2rem;
		font-weight: 600;
	}

	li {
		transition: transform 0.1s ease-in-out;
	}

	li:hover {
		transform: scale(1.05);
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
