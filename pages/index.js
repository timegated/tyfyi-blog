import Layout from '../components/common/layout';
import PostList from '../components/PostList/PostList';
import getPosts from '../utils/getPosts';
import { Container } from '../components/globalStyles/global';
import Banner from '../components/Banner/Banner';

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <Banner title="Thank You For Your Interest" sub="Some basic and not so basic stuff when your writing software for the web" />
        <Container>
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