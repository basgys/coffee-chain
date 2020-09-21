import React, { useState } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Web3Provider } from 'contexts/web3'
import { config } from 'libs/config'

import "main.scss"
import Sprite from 'sprite.svg'

const defaultTitle = "Coffee Chain"

const CustomApp = (props) => {
  const { Component, acceptLanguage, languages, ...rest } = props

  const router = useRouter()
  const [state, setState] = useState({
    title: defaultTitle,
  })
  return (
    <div className="app">
      <Head>
        <title>{state.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0,user-scalable=0" />
        <link href="https://fonts.googleapis.com/css?family=Heebo:700,800,900|Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      </Head>

      <Web3Provider endpoint={config.get("WEB3_ENDPOINT")}>
        <Component {...rest} />
      </Web3Provider>

      <Sprite />
      <div id="popper" />
    </div>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
CustomApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  let acceptLanguage = ""
  if (ctx.req) {
    // Server-side rendering
    acceptLanguage = ctx.req.headers['accept-language']
  } else if (navigator) {
    // Client-side rendering
    acceptLanguage = navigator.languages.join(";")
  }

  return {
    ...appProps?.pageProps,
    acceptLanguage: acceptLanguage,
  }
}

export default CustomApp