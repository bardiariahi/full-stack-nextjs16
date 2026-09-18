import React from 'react'

type DPProps = {
    children: React.ReactNode
}

const DashboardPadding = ({children} : DPProps ) => {
  return (
    <div className='min-h-0 min-w-0 flex-1 overflow-auto p-4 [overflow-wrap:anywhere] sm:p-6 lg:p-8'>{children}</div>
  )
}

export default DashboardPadding