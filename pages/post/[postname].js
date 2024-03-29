import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown/with-html';
import Layout from '../../components/common/layout';
import getSlugs from '../../utils/getSlugs';
import CodeBlock from '../../components/common/codeblock';
import Link from 'next/link';
import { Container } from '../../components/globalStyles/global';
const BlogPost = ({ siteTitle, frontmatter, markdownBody }) => {
  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <Container>
          <h1>{frontmatter.title}</h1>
          <span>{frontmatter.date}</span>
          <ReactMarkdown source={markdownBody}
            allowDangerousHtml
            renderers={
              {
                code: CodeBlock,
                link: ({ children, href }) => {
                  return <Link href={href}>
                    <a>{children}</a>
                  </Link>
                }
              }} />
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../posts/${postname}.md`);
  const config = await import(`../../siteconfig.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content
    }
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../posts', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/post/${slug}`)

  return {
    paths,
    fallback: false
  }
}



export default BlogPost;