<script>
	import { Pause, Play, StepBack, StepForward } from 'lucide-svelte';

	let { config } = $props();

	let currentSession = $derived(config?.currentSession);

	let title = $derived(currentSession?.title);
	let artist = $derived(currentSession?.artist);
	// let album = $derived(currentSession?.albumTitle);
	// let albumArtist = $derived(currentSession?.albumArtist);
	// let trackNumber = $derived(currentSession?.trackNumber);

	let isPlaying = $derived(currentSession?.isPlaying ?? false);
</script>

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
<span>{title}</span>
<span>-</span>
<span>{artist}</span>
<button onclick={() => config.next()}>
	<StepForward size={20} />
</button>
