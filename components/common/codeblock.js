import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock = ({ value, language }) => {
  
  return (
    <SyntaxHighlighter language={language} style={ atomDark }>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock

