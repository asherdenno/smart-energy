// "use client"

// import { SessionProvider } from "next-auth/react"
// import React, { ReactNode } from "react"

// interface Props {
//     children: ReactNode;
// }

// function Providers({ children }: Props) {
//     return <SessionProvider>{children}</SessionProvider>
// }

// export default Providers;

"use client"
import { SessionProvider } from "next-auth/react"
import React from "react"

function Providers({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Providers;
