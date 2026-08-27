import React from 'react'

type DPProps = {
    children: React.ReactNode
}

const DashboardPadding = ({children} : DPProps ) => {
  return (
    <div className='p-8'>{children}</div>
  )
}

export default DashboardPadding