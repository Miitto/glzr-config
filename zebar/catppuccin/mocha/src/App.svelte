<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import '../../../normalize.css';
	import * as zebar from 'zebar';
	import { ChevronsUpDown, ChevronsLeftRight } from 'lucide-svelte';
	import Segment from './lib/Segment.svelte';
	import Media from './lib/Media.svelte';

	const providers = zebar.createProviderGroup({
		glazewm: { type: 'glazewm' },
		date: { type: 'date', formatting: 'HH:mm:ss' },
		media: { type: 'media' }
	});

	let output = $state(providers.outputMap);

	let focused_workspace = $derived(
		output.glazewm?.currentWorkspaces.find((workspace) => workspace.hasFocus)
	);

	let window_name = $derived(get_focused_name(focused_workspace?.children ?? []));

	let last_window_name = $state();

	$effect(() => {
		if (!window_name) return;

		untrack(() => (last_window_name = window_name));
	});

	function get_focused_name(list: any[]) {
		for (let e of list) {
			if (e.type === 'window') {
				if (e.hasFocus) {
					return e.title;
				}
			}
			if (e.type === 'split_container') {
				return get_focused_name(e.children);
			}
		}
	}

	onMount(() => {
		providers.onOutput(() => (output = providers.outputMap));
	});

	let date = $derived(output.date?.formatted);
</script>

<main class="grid h-full w-full grid-cols-3 items-center gap-x-4 px-4 text-sm text-text">
	<div class="flex flex-row items-center justify-start">
		<Segment>
			<div class="flex flex-row items-center gap-x-4">
				{#if date}
					<div>{date}</div>
				{/if}
			</div></Segment
		>
	</div>

	<div class="flex max-w-full flex-row items-center justify-center overflow-hidden">
		<Segment>
			<!-- Center -->
			{#if output.glazewm}
				<div class="flex flex-row items-center justify-center py-0.5">
					{#each output.glazewm!.currentWorkspaces as workspace (workspace.name)}
						<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
						<button
							class="flex h-full flex-row items-center rounded-full px-2 text-base text-xs text-text transition-[padding] aria-selected:bg-subtext1 aria-selected:px-4 aria-selected:text-base aria-selected:text-xs"
							aria-selected={workspace.hasFocus}
							onclick={() => output.glazewm!.runCommand(`focus --workspace ${workspace.name}`)}
							>{workspace.displayName ?? workspace.name}</button
						>
					{/each}
				</div>

				{#if window_name || last_window_name}
					<span class="truncate text-nowrap text-xs">
						{window_name ?? last_window_name}
					</span>
				{/if}
			{/if}
		</Segment>
	</div>

	<div class="flex max-w-full flex-row items-center justify-end gap-x-4 overflow-hidden">
		<Segment>
			<Media config={output.media} />
		</Segment>
		<Segment>
			{#if output.glazewm}
				<!--
				{#if output.glazewm.isPaused}
					<Pause />
				{/if}
        -->
				{#each output.glazewm.bindingModes as bindingMode (bindingMode.name)}
					<button
						onclick={() => {
							output.glazewm!.runCommand(`wm-disable-binding-mode --name ${bindingMode.name}`);
						}}>{bindingMode.displayName ?? bindingMode.name}</button
					>
				{/each}

				<button
					class="h-full px-1.5"
					onclick={() => {
						output.glazewm!.runCommand('toggle-tiling-direction');
					}}
					aria-label="Toggle Tiling Direction"
				>
					{#if output.glazewm!.tilingDirection === 'horizontal'}
						<ChevronsLeftRight size={20} />
					{:else}
						<ChevronsUpDown size={20} />
					{/if}
				</button>
			{/if}
		</Segment>
	</div>
</main>
