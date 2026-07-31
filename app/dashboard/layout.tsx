import React from "react"

type LTypes = {
  children: React.ReactNode
}

const layout = ({children } : LTypes ) => {
  return (
    <div className="bg-white">
      {children}
    </div>
  )
}

export default layout