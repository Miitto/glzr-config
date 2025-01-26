<script lang="ts">
	let { children, class: cls = '' } = $props();
</script>

<section
	class={`${cls} flex-wrap-0 flex h-[20px] w-fit max-w-full flex-row items-center justify-center gap-x-2 overflow-hidden rounded-full bg-base px-2`}
>
	{@render children()}
</section>
