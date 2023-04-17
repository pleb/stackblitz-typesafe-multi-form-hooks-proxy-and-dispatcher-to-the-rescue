import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import { LoadingContext } from '~/contexts/loadingContext'

import styles from './styles/app.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
  return {
    title: 'Simple to-do tracking application',
    description:
      'Simple to-do application is a collection of to-do entries that can be completed, edited or deleted',
  }
}

export default function App() {
  const transition = useTransition()
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <LoadingContext.Provider
          value={{ isLoading: transition.state !== 'idle' }}
        >
          <Outlet />
        </LoadingContext.Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
