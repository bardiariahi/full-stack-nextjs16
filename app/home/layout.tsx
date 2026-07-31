import React from "react"

type LTypes = {
  children: React.ReactNode
}

const layout = ({children } : LTypes ) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout