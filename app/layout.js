"use client"

import './globals.css'
import Navbar from './Navbar/page'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import { Roboto_Mono } from "next/font/google"
import Footer from './footer/page'
import CheckBoxContext from './ContextAPI/CheckBoxContext'
import AuthenticationProvider from './ContextAPI/auth-context'

const robo = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

const queryClient = new QueryClient()


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={robo.className} >
      <body className={` bgText flex flex-col min-h-screen p-2 sm:p-6 `}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
        <CheckBoxContext>
      <Navbar/>
        {children}
        <Footer/>
        </CheckBoxContext>
        </AuthenticationProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      </QueryClientProvider>
        </body>
    </html>
  )
}
