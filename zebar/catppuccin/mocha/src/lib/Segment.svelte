<script lang="ts">
	let { children } = $props();
</script>

<section
	class="flex-wrap-0 flex h-full w-fit flex-row items-center gap-x-2 rounded-full bg-base px-2 py-0.5"
>
	{@render children()}
</section>
