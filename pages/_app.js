import '../styles/globals.css'
import React from 'react'
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Home from '.'
import { AuthProvider } from './context/AuthProvider'

function MyApp({ Component, pageProps }) {
  return(

    <StateContext>
      <AuthProvider>
<Layout>
  <Toaster/>
  <Component {...pageProps} />
  </Layout>
  </AuthProvider>
  </StateContext>

  )
}

export default MyApp
