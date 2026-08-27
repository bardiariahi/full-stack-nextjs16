import React from 'react'

type DCProps = {
    children: React.ReactNode
}

const DashboardContainer = ({children}: DCProps) => {
  return (
    <div className='w-full h-screen bg-gray-100 flex'>{children}</div>
  )
}

export default DashboardContainer