import type { Post } from '$lib/types'
import { json } from '@sveltejs/kit'

async function getPosts() {
    let posts = []

    // Retrieve the paths to all .md files in the /src/posts/ directory
    const paths = import.meta.glob('/src/posts/*.md', {
        eager: true
    })

    // Iterate through each path
    for (const path in paths) {
        const file = paths[path]

        // Extract the slug from the path
        const slug = path.split('/').at(-1)?.replace('.md', '')

        if (file && typeof file === 'object' && 'metadata' in file && slug) {

            // Assume file.metadata contains the metadata for the post
            const metadata = file.metadata as Omit<Post, 'slug'>

            // Construct a post object containing the metadata and the slug
            const post = { ...metadata, slug } satisfies Post

            // If the post is published, add it to the posts array
            if (post.published) {
                posts.push(post)
            }
        }

    }

    // Sort the posts in descending order by date
    // Convert the date strings to Date objects and subtract their time values to get the difference
    // If the first date is later than the second, the result is negative, which means the first post comes after the second
    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return posts
}

export async function GET() {
    const post = await getPosts()
    return json(post)
}