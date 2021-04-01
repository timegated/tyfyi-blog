import Layout from '../components/common/layout';
import Head from 'next/head';
const Index = ({ title, description, ...props }) => {
  return (
    <>
      <Head>
        <title>Thank You For Your Interest</title>
      </Head>
      <Layout>
        <h1>Thank You For Your Interest</h1>
        <p style={{ color: 'darkgray', opacity: .8 }}>We know you're a talented developer</p>
        <a href="http://localhost:3000/posts/last-resort-fix">A Last Resort Fix</a>
        {" "}
        <a href="http://localhost:3000/posts/all-about-closure">All About Closure</a>
      </Layout>
    </>
  )
};

export default Index;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  }
}