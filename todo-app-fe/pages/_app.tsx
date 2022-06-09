import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, min-width=640' />
        <meta name='theme-color' content='#333' />
        <meta name='description' content='Todo App' />
        <link rel='shortcut icon' href='/favicon.ico' key='shortcutIcon' />

        <link rel='stylesheet' href='/assets/css/reset.css' />
        <link rel='stylesheet' href='/assets/css/fonts.css' />
        <link rel='stylesheet' href='/assets/css/global.css' />

        <link rel='manifest' href='/manifest.json' />
        <title>Todo App</title>
      </Head>
      <RecoilRoot>
        {/* <RecoilizeDebugger root={root} /> */}
        <Component {...pageProps} />
        <div id='root-portal' />
        <div id='root-portal-modal' />
      </RecoilRoot>
    </>
  )
}

export default App
