"use client"
import { signIn, signOut, useSession } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()
  return (
    <div>
      {session?.user ? (
        <>
          <p>{session.user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}

export default LoginButton
