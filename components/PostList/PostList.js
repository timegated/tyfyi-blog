import Link from 'next/link';
import { List, Title } from './style';
import {v4 as uuidv4} from 'uuid'

const PostList = ({ posts }) => {
  if (posts === undefined) return null;
  return (
    <div>
      <Title>Recent Posts</Title>
      {!posts && <div>No Posts Yet!</div>}
      <List>
        {posts &&
          posts.map((post, idx) => (
            <li key={uuidv4()}>
              <Link href={{ pathname: `/post/${post.slug}` }}>{post?.frontmatter?.title}</Link>
              <span className="post-date">{post?.frontmatter?.date}</span>
          </li>
        ))}
      </List>
    </div>
  )
}

export default PostList
