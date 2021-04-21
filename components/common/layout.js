import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import Head from 'next/head';

import theme from "../../styles/theme";
import GlobalStyles from "../../styles/GlobalStyles"

export default function Layout({ children, pageTitle, description, ...props }) {
  return (
    <ThemeProvider theme={theme}>
       <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="Description" content={description} />
          <title>{pageTitle}</title>
        </Head>
  
        <GlobalStyles />
        {children}
     
    </ThemeProvider>
  )
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}