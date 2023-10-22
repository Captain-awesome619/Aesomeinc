import '../styles/globals.css'
import React from 'react'
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Home from '.'
import { AuthProvider } from './context/AuthProvider'

function MyApp({ Component, pageProps }) {
  return(
<AuthProvider>
    <StateContext>
<Layout>
  <Toaster/>
  <Component {...pageProps} />
  </Layout>
  </StateContext>
  </AuthProvider>
  )
}

export default MyApp
