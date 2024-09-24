import { Outlet } from 'react-router-dom'

import background from '../../assets/background.png'
import logo from '../../assets/Logo.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 bg-muted antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/0 p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex h-screen items-start justify-center">
          <img src={background} alt="background" className="mt-10" />
        </div>
      </div>

      <div className="relative m-10 flex flex-col items-center justify-center rounded-3xl bg-white">
        <Outlet />
      </div>
    </div>
  )
}
