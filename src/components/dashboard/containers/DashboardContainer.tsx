import React from 'react'

type DCProps = {
    children: React.ReactNode
}

const DashboardContainer = ({children}: DCProps) => {
  return (
    <div className='relative flex h-dvh w-full overflow-hidden bg-gray-100'>{children}</div>
  )
}

export default DashboardContainer