<script lang="ts">
	import * as d3 from "d3"
	import data from "../data"
	import { onMount } from "svelte"

	let width = 650,
		height = 200,
		margin = { top: 20, right: 30, bottom: 0, left: 120 }

	const x = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.value) ?? 10])
		.range([margin.left, width - margin.right])
		.interpolate(d3.interpolateRound)

	const y = d3
		.scaleBand()
		.domain(data.map((d) => d.name))
		.range([margin.top, height - margin.bottom])
		.padding(0.1)
		.round(true)

	let g1: SVGGElement, g2: SVGGElement

	onMount(() => {
		d3.select(g1)
			.call(d3.axisTop(x))
			.call((g) => g.select(".domain").remove())
			.node()

		d3.select(g2)
			.call(d3.axisLeft(y))
			.call((g) => g.select(".domain").remove())
			.node()
	})
</script>

<svg
	viewBox="0 0 {width} {height}"
	style="max-width: {width}px; font: 10px sans-serif;"
>
	<g fill="steelblue">
		{#each data as d}
			<rect
				y={y(d.name)}
				x={x(0)}
				width={x(d.value) - x(0)}
				height={y.bandwidth()}
			/>
		{/each}
	</g>

	<g
		fill="black"
		text-anchor="start"
		transform="translate(2,{y.bandwidth() / 2})"
	>
		{#each data as d}
			<text y={y(d.name)} x={x(d.value)} dy="0.35em">{d.value}</text>
		{/each}
	</g>

	<g transform="translate(0, {margin.top})" bind:this={g1} />

	<g transform="translate({margin.left}, 0)" bind:this={g2} />
</svg>
