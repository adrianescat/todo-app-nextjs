import type { NextPage } from 'next'
import React from 'react'
import DashboardPageComponent from '../src/PagesComponents/Dashboard'
import AuthWrapper from '../src/components/AuthWrapper'

const DashboardPage: NextPage = () => {
  return (
    <AuthWrapper>
      <DashboardPageComponent />
    </AuthWrapper>
  )
}

export default DashboardPage
