<script lang="ts">
	export let help: string

	let dialog: HTMLDialogElement

	function dialogClickHandler(e: MouseEvent) {
		if (!e.target || (e.target as HTMLElement).tagName !== "DIALOG") return
		const target = e.target as HTMLElement
		const rect = target.getBoundingClientRect()

		const clickedInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width

		if (clickedInDialog === false) dialog.close()
	}
</script>

<button on:click={() => dialog.showModal()}>?</button>
<dialog bind:this={dialog} on:keypress={() => {}} on:click={dialogClickHandler}>
	{help}
</dialog>

<style>
	button {
		--size: 1.7rem;
		border: none;
		width: var(--size);
		height: var(--size);
		line-height: 2px;
		display: inline-block;
		outline: 0;
		cursor: pointer;
		border: none;
		border-radius: 100px;
		font-size: 16px;
		font-weight: 600;
		background: var(--primary);
		color: #fff;
		box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
		transition: background-color 0.2s ease, color 0.2s ease,
			box-shadow 0.2s ease;
	}

	button:hover {
		box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
	}

	dialog {
		border: none;
		border-radius: var(--radius);
	}
</style>
