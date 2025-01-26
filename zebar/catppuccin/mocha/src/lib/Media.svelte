<script>
	import { Pause, Play, StepBack, StepForward } from 'lucide-svelte';
	import Segment from './Segment.svelte';

	let { config } = $props();

	let currentSession = $derived(config?.currentSession);

	let title = $derived(currentSession?.title);
	let artist = $derived(currentSession?.artist);
	// let album = $derived(currentSession?.albumTitle);
	// let albumArtist = $derived(currentSession?.albumArtist);
	// let trackNumber = $derived(currentSession?.trackNumber);

	let isPlaying = $derived(currentSession?.isPlaying ?? false);
</script>

{#if title || artist}
	<Segment>
		<span class="truncate text-nowrap">{title}</span>
		<span>-</span>
		<span>{artist}</span>
		<button onclick={() => config.previous()}>
			<StepBack size={20} />
		</button>
		<button onclick={() => config.togglePlayPause()}>
			{#if isPlaying}
				<Pause size={20} />
			{:else}
				<Play size={20} />
			{/if}
		</button>
		<button onclick={() => config.next()}>
			<StepForward size={20} />
		</button>
	</Segment>
{/if}
