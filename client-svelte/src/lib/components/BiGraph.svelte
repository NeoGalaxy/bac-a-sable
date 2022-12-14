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
	$: margin = { horizontal: 200, vertical: windowHeight / 5 }
	$: width = windowWidth - margin.horizontal * 2
	$: height = windowHeight - margin.vertical * 2 - 55

	let domainPadding = 2
	$: x = d3
		.scaleLinear()
		.domain([
			Math.min(0, d3.min(dataX.results, (d) => d.value) - domainPadding),
			d3.max(dataX.results, (d) => d.value) + domainPadding,
		])
		.range([padding.left, width - padding.right])
		.interpolate(d3.interpolateRound)
	$: y = d3
		.scaleLinear()
		.domain([
			Math.min(0, d3.min(dataY.results, (d) => d.value) - domainPadding),
			d3.max(dataY.results, (d) => d.value) + domainPadding,
		])
		.range([height - padding.bottom, padding.top])
		.interpolate(d3.interpolateRound)

	let verticalAxis: SVGGElement, horizontalAxis: SVGGElement

	$: d3VAxis = d3
		.select(verticalAxis)
		.call(d3.axisLeft(y).tickFormat((d) => `${d}%`))
	$: d3HAxis = d3
		.select(horizontalAxis)
		.call(d3.axisBottom(x).tickFormat((d) => `${d}%`))

	$: d3VAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")
	$: d3HAxis.selectAll("path, line").attr("style", "stroke: var(--primary)")

	let hover: string = null
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<div class="container" style="width: {width}px;">
	<svg
		viewBox="0 0 {width} {height}"
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
		{#each candidates as candidate}
			{@const xValue = dataX.results.find(e => e.name == candidate.name).value}
			{@const yValue = dataY.results.find(e => e.name == candidate.name).value}
			{@const xPos = x(xValue)}
			{@const yPos = y(yValue)}
			{@const darkerColor = d3.color(candidate.color).darker(0.4).formatHex()}
			<g fill={candidate.color}>
				<circle
					cx={xPos}
					cy={yPos}
					r={4}
					stroke={darkerColor}
					stroke-width="2"
					style:transition="all 0.5s ease-in-out"
					class:active={hover === candidate.name}
				/>
				<g
					class="tooltip"
					stroke={candidate.color}
					fill={candidate.color}
					font-weight={700}
				>
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
							stroke-width={0}
							x={0}
							y={yPos - 10}
							width={padding.left - 8}
							height={16}
						/>
						<text
							x={padding.left - 8}
							y={yPos}
							dominant-baseline="middle"
							text-anchor="end"
							fill={darkerColor}
						>
							{printPercentage(yValue)}
						</text>

						<line
							x1={xPos}
							y1={yPos}
							x2={xPos}
							y2={height - 18}
							stroke-width={2}
						/>
						<rect
							fill="white"
							stroke-width={0}
							x={xPos - 26}
							y={height - 16}
							width={52}
							height={16}
						/>
						<text
							x={xPos}
							y={height - 5}
							text-anchor="middle"
							fill={darkerColor}
						>
							{printPercentage(xValue)}
						</text>
					</g>
				</g>
			</g>
		{/each}
	</svg>

	<aside class="legend">
		{#each candidates as candidate, i}
			{@const textColor = d3.color(candidate.color).darker(0.6).formatHex()}
			{@const darkerColor = d3.color(candidate.color).darker(0.4).formatHex()}
			<div
				class="candidate-legend"
				on:mouseenter={() => (hover = candidate.name)}
				on:mouseleave={() => (hover = null)}
			>
				<svg viewBox="0 0 10.2 10.2" style="width: 10.2px">
					<circle
						fill={candidate.color}
						cx="5.1"
						cy="5.1"
						r="4"
						stroke={darkerColor}
						stroke-width="2"
					/>
				</svg>
				<span style:color={textColor}>
					{candidate.name}
				</span>
			</div>
		{/each}
	</aside>
</div>

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

	circle:hover + .tooltip,
	.active + .tooltip {
		opacity: 1;
	}

	.percentages {
		font-size: 0.8rem;
	}

	line {
		pointer-events: fill;
	}

	.candidate-legend {
		cursor: pointer;
		font-size: 0.9rem;
		display: flex;
		gap: 0.4rem;
	}

	.legend {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1rem;
	}
</style>
