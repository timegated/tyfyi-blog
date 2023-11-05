import React from 'react';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Layout from '../../components/common/layout';
import getSlugs from '../../utils/getSlugs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import Link from 'next/link';
import { Container } from '../../components/globalStyles/global';

const BlogPost = ({ siteTitle, frontmatter, markdownBody }) => {
  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <Container>
          <h1>{frontmatter.title}</h1>
          <span>{frontmatter.date}</span>
          <a href="https://tyfyi.blog" style={{ marginLeft: "1rem" }}>Home</a>
          <Markdown
            components={
              {
                img({
                  alt,
                  src,
                  title,
                }) {
                  return (
                    <div style={{ display: "flex", justifyContent: "center", cursor: "not-allowed" }}>
                      <img
                        alt={alt}
                        src={src}
                        title={title}
                        style={{
                          maxWidth: 800,
                          height: 500,
                          borderRadius: 8,
                          cursor: "not-allowed"
                        }} />
                    </div>
                  )
                },
                code(props) {
                  const { children, className, node, ...rest } = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      children={String(children).replace(/\n$/, '')}
                      style={okaidia}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )
                },
                Link: ({ children, href }) => {
                  return <Link href={href}>
                    <a>{children}</a>
                  </Link>
                }
              }}>
            {markdownBody}
          </Markdown>
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