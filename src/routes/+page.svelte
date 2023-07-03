<script lang="ts">
	import { formatDate } from '$lib/utils';
	export let data;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="container mx-auto w-2/3 flex justify-center items-center">
	<ul class="w-screen">
		{#each data.posts as post}
			<li class="border-b-[1px] border-red-300 last:border-b-0 py-10">
				<a class="text-3xl" href={post.slug}>{post.title}</a>
				<p class="mt-5">{formatDate(post.date)}</p>
				<p>{post.description}</p>
			</li>
		{/each}
	</ul>
</div>
