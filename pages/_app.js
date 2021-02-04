import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json';
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
        <title>WhoQuiz</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"/>

        
        <title>WHOquiz - Um quiz sobre Doctor Who</title>
        <meta name="title" content="WHOquiz - Um quiz sobre Doctor Who"/>
        <meta name="description" content="Teste seus conhecimentos sobre o viajante do tempo mais excêntrico que você já viu "/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://metatags.io/"/>
        <meta property="og:title" content="WHOquiz - Um quiz sobre Doctor Who"/>
        <meta property="og:description" content="Teste seus conhecimentos sobre o viajante do tempo mais excêntrico que você já viu "/>
        <meta property="og:image" content="https://images.pexels.com/photos/3573555/pexels-photo-3573555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://metatags.io/"/>
        <meta property="twitter:title" content="WHOquiz - Um quiz sobre Doctor Who"/>
        <meta property="twitter:description" content="Teste seus conhecimentos sobre o viajante do tempo mais excêntrico que você já viu "/>
        <meta property="twitter:image" content="https://images.pexels.com/photos/3573555/pexels-photo-3573555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></meta>

      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}