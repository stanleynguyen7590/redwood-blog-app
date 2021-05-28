import { Link, routes } from '@redwoodjs/router'
interface IBlogPost {
  post: any
}
const BlogPost: React.FunctionComponent<IBlogPost> = ({ post }) => {
  return (
    <article key={post.id}>
      <header>
        <h2>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <p>{post.body}</p>
      <div>Posted at: {post.createdAt}</div>
    </article>
  )
}

export default BlogPost
