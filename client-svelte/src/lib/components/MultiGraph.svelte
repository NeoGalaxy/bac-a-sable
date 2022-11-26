<script lang="ts">
	import * as d3 from "d3"
	import { dataByCandidate } from "../data"
	import { filters } from "../stores"

	let windowWidth = 800,
		windowHeight = 600,
		navBarHeight = 60,
		padding = { top: 5, right: 5, bottom: 50, left: 100 }
	$: margin = { horizontal: 200, vertical: windowHeight / 7 }
	$: width = windowWidth - margin.horizontal * 2
	$: height = windowHeight - margin.vertical * 2
	$: shownMethods = $filters.methods.filter((v) => v).length

	$: x = d3
		.scaleBand()
		.domain(dataByCandidate.map((d) => d.name))
		.range([padding.left, width - padding.right])
		.padding(0.1)

	$: y = d3
		.scaleLinear()
		.domain([0, d3.max(dataByCandidate, (d) => d3.max(d.data, (e) => e.value))])
		.range([height - padding.bottom, padding.top])
		.interpolate(d3.interpolateRound)

	let verticalAxis: SVGGElement, horizontalAxis: SVGGElement

	$: d3VAxis = d3
		.select(verticalAxis)
		.call(d3.axisLeft(y).tickFormat((d) => `${d}%`))
	$: d3HAxis = d3.select(horizontalAxis).call(d3.axisBottom(x))

	$: d3VAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")
	$: d3HAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")
	$: d3HAxis.selectAll(".tick:nth-child(odd) text").attr("dy", 18)
	$: d3HAxis.selectAll(".tick:nth-child(odd) line").attr("y2", 16)
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<svg
	viewBox="0 0 {width} {height}"
	style="max-width: {width}px;
         margin-top: {margin.vertical - navBarHeight / 2}px"
>
	{#each dataByCandidate as candidate}
		<g
			fill={candidate.color}
			style="stroke: {d3.color(candidate.color).darker(0.4).formatHex()}"
			stroke-width={3}
			stroke-linejoin="round"
		>
			{#each candidate.data.filter((_, k) => $filters.methods[k]) as data, j}
				{@const bandWidth = x.bandwidth() / shownMethods}
				<rect
					x={x(candidate.name) + j * bandWidth}
					y={y(data.value)}
					width={bandWidth}
					height={y(0) - y(data.value) - 1}
				/>
			{/each}
		</g>
	{/each}

	<g bind:this={verticalAxis} transform="translate({padding.left}, 0)" />
	<g
		bind:this={horizontalAxis}
		transform="translate(0, {height - padding.bottom})"
	/>
</svg>

<style>
	svg > g {
		stroke-width: 3;
		stroke-linecap: round;
	}

	svg > g :global(text) {
		stroke: initial;
		stroke-width: initial;
	}
</style>
