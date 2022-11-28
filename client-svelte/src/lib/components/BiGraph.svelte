<script lang="ts">
	import * as d3 from "d3"
	import { printPercentage } from "../functions"
	import type { Candidate, DataByMethod } from "../types"

	export let candidates: Candidate[]
	export let dataX: DataByMethod
	export let dataY: DataByMethod

	let windowWidth = 800,
		windowHeight = 600,
		navBarHeight = 60,
		padding = { top: 40, right: 15, bottom: 40, left: 60 }
	$: margin = { horizontal: 200, vertical: windowHeight / 7 }
	$: width = windowWidth - margin.horizontal * 2
	$: height = windowHeight - margin.vertical * 2

	let domainPadding = 2
	$: x = d3
		.scaleLinear()
		.domain([0, d3.max(dataX.results, (d) => d.value) + domainPadding])
		.range([padding.left, width - padding.right])
		.interpolate(d3.interpolateRound)
	$: y = d3
		.scaleLinear()
		.domain([0, d3.max(dataY.results, (d) => d.value) + domainPadding])
		.range([height - padding.bottom, padding.top])
		.interpolate(d3.interpolateRound)

	$: legendX = d3
		.scaleBand()
		.domain(candidates.map((d, i) => i.toString()))
		.range([0, width - padding.right * 2])
		.padding(0.1)

	let verticalAxis: SVGGElement, horizontalAxis: SVGGElement

	$: d3VAxis = d3
		.select(verticalAxis)
		.call(d3.axisLeft(y).tickFormat((d) => `${d}%`))
	$: d3HAxis = d3
		.select(horizontalAxis)
		.call(d3.axisBottom(x).tickFormat((d) => `${d}%`))

	$: d3VAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")
	$: d3HAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />


<svg
	viewBox="0 0 {width} {height + /* ajout de marge dans le svg */40}"
	style="max-width: {width}px;
margin-top: {margin.vertical - navBarHeight / 2}px"
>
	<text text-anchor="end" x={width} y={height - 5}>
		{dataX.methodName}
	</text>

	<text text-anchor="start" x={0} y={23} dominant-baseline="hanging">
		{dataY.methodName}
	</text>

	<g bind:this={verticalAxis} transform="translate({padding.left}, 0)" />
	<g
		bind:this={horizontalAxis}
		transform="translate(0, {height - padding.bottom})"
	/>
	{#each candidates as candidate, i}
		{@const xPos = x(dataX.results[i].value)}
		{@const yPos = y(dataY.results[i].value)}
		{@const darkerColor = d3.color(candidate.color).darker(0.4).formatHex()}
		<g fill={candidate.color}>
			<circle
				cx={xPos}
				cy={yPos}
				r={4}
				style:transition="all 0.5s cubic-bezier(.64,.02,.73,.18)"
			/>
			<g class="tooltip" stroke={candidate.color} fill={candidate.color}>
				<line x1={xPos} y1={28} x2={xPos} y2={yPos} />
				<text
					fill={darkerColor}
					x={xPos}
					y={15}
					dominant-baseline="middle"
					text-anchor={xPos < 100
						? "start"
						: width - xPos < 100
						? "end"
						: "middle"}
				>
					{candidate.name}
				</text>

				<g class="percentages">
					<line
						x1={padding.left - 5}
						y1={yPos}
						x2={xPos}
						y2={yPos}
						stroke-width={2}
					/>
					<rect
						fill="white"
						stroke="transparent"
						x={0}
						y={yPos - 12}
						width={padding.left - 7}
						height={22}
					/>
					<text
						x={padding.left - 8}
						y={yPos}
						dominant-baseline="middle"
						text-anchor="end"
					>
						{printPercentage(dataY.results[i].value)}
					</text>

					<line
						x1={xPos}
						y1={yPos}
						x2={xPos}
						y2={height - 18}
						stroke-width={2}
					/>
					<text x={xPos} y={height - 5} text-anchor="middle">
						{printPercentage(dataX.results[i].value)}
					</text>
				</g>
			</g>
		</g>
	{/each}

	{#each candidates as candidate, i}
		{@const yPos = height + 10 + 20 * (i % 2)}
		{@const xPos = legendX((Math.floor(i/2) * 2).toString())}
		{@const textColor = d3.color(candidate.color).darker(2).formatHex()}
		<g fill={candidate.color}>
			<circle
				cx={xPos}
				cy={yPos}
				r={4}
			/>
			<text
				x={xPos + 8}
				y={yPos}
				dominant-baseline="middle"
				text-anchor="start"
				fill={textColor}
				font-size="0.9em"
			>
				{candidate.name}
			</text>
		</g>
	{/each}
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

	svg > text {
		font-size: 0.9rem;
	}

	.tooltip {
		opacity: 0;
		transition: opacity 0.1s ease-in-out;
	}

	circle:hover + .tooltip {
		opacity: 1;
	}

	.percentages {
		font-size: 0.8rem;
	}

	line {
		pointer-events: fill;
	}
</style>
