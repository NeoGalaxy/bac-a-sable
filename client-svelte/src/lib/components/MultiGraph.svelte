<script lang="ts">
	import * as d3 from "d3"
	import type { DataByCandidate } from "../types"
	import { filters, hoveredBar } from "../stores"
	import { printPercentage } from "../functions"

	export let dataByCandidate: DataByCandidate

	let windowWidth = 800,
		windowHeight = 600,
		navBarHeight = 60,
		padding = { top: 40, right: 5, bottom: 40, left: 40 }
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
		.domain([
			0,
			d3.max(dataByCandidate, (d) =>
				d3.max(
					d.data.filter((_, i) => $filters.methods[i]),
					(e) => e.value
				)
			),
		])
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
		{@const borderColor = d3.color(candidate.color).darker(0.4).formatHex()}
		<g
			fill={candidate.color}
			style="stroke: {borderColor}"
			stroke-width={3}
			stroke-linejoin="round"
		>
			{#each candidate.data as data, globalIndex}
				{@const isShown = $filters.methods[globalIndex]}
				{@const bandWidth = x.bandwidth() / shownMethods}
				{@const localIndex = (() => {
					let index = 0
					for (let i = 0; i < globalIndex; i++) {
						index += $filters.methods[i] ? 1 : 0
					}
					return index
				})()}
				<rect
					x={x(candidate.name) + localIndex * bandWidth}
					y={isShown ? y(data.value) : height - padding.bottom}
					width={isShown ? bandWidth : 0}
					height={isShown ? y(0) - y(data.value) - 1 : 0}
					style:transition="all 0.5s cubic-bezier(.64,.02,.73,.18)"
				/>

				<rect
					class="bar-zone"
					x={x(candidate.name) + localIndex * bandWidth}
					y={isShown ? padding.top : height - padding.bottom}
					width={isShown ? bandWidth : 0}
					height={isShown ? y(0) - padding.bottom : 0}
					on:mouseenter={() => {
						$hoveredBar = { methodId: data.methodId, color: borderColor }
					}}
					on:mouseleave={() => {
						$hoveredBar = null
					}}
				/>
				{#if isShown}
					<g class="tooltip">
						<line
							x1={x(candidate.name) + localIndex * bandWidth + bandWidth / 2}
							y1={28}
							x2={x(candidate.name) + localIndex * bandWidth + bandWidth / 2}
							y2={y(data.value) - 2}
						/>
						<text
							x={x(candidate.name) + localIndex * bandWidth + bandWidth / 2}
							y={15}
							fill={borderColor}
							dominant-baseline="middle"
							text-anchor="middle"
						>
							{printPercentage(data.value)}
						</text>
					</g>
				{/if}
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

	.tooltip {
		display: none;
	}

	.bar-zone {
		fill: transparent;
		stroke: transparent;
	}

	.bar-zone:hover + .tooltip {
		display: block;
	}

	line {
		pointer-events: fill;
	}
</style>
