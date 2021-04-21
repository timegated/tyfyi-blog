import Layout from '../components/common/layout';
import PostList from '../components/PostList/PostList';
import getPosts from '../utils/getPosts';
import { Container } from '../components/globalStyles/global';
const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <Container>
          <h1>Thank You For Your Interest</h1>
          <h6>We know you're a talented developer</h6>
          <main>
            <PostList posts={posts} />
          </main>
        </Container>
      </Layout>
    </>
  )
};

export default Index;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description
    }
  }
}