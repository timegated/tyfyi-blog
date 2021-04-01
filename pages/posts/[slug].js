import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown/with-html';
import Layout from '../../components/common/layout';
import CodeBlock from '../../components/common/codeblock';
import Link from 'next/link';

const PostTemplate = ({ content, data }) => {

  const frontmatter = data;

  return (
    <>
      <Layout>
        <h1>{frontmatter.title}</h1>
        <ReactMarkdown source={content}
          allowDangerousHtml
          renderers={
            {
              code: CodeBlock,
              link: ({ children, href }) =>
              {
                return <Link href={href}>
                  <a>{children}</a>
                </Link>
              }
            }} />
      </Layout>
    </>
  );
};


PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;
  const content = await import(`../../content/${slug}.md`);
  const data = matter(content.default);

  return { ...data }

  return { slug }
};


export default PostTemplate;