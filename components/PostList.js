import Link from 'next/link';

const PostList = ({ posts }) => {
  if (posts === undefined) return null;

  return (
    <div>
      {!posts && <div>No Posts Yet!</div>}
      <ul>
        {posts &&
          posts.map(post => (
            <li key={post.slug}>
              <Link href={{ pathname: `/post/${post.slug}` }}><a>{ post?.frontmatter?.title }</a></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
