import React from 'react';

const PostTemplate = (props) => {
  return (
    <div>
      {props.slug}
    </div>
  );
};


PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  return { slug };
};


export default PostTemplate;