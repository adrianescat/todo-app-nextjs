import { NextPage, InferGetStaticPropsType, GetServerSideProps } from 'next'
import React from 'react'
import DashboardPageComponent from '../src/PagesComponents/Dashboard'
import AuthWrapper from '../src/components/AuthWrapper'

const DashboardPage: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  urlName,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <AuthWrapper>
      <DashboardPageComponent urlName={urlName} />
    </AuthWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      urlName: context?.req?.url,
    },
  }
}

export default DashboardPage
