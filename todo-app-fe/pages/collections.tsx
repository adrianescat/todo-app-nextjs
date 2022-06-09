import { NextPage, GetServerSideProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import Collections from '../src/PagesComponents/Collections'
import AuthWrapper from '../src/components/AuthWrapper'

const CollectionsPage: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  urlName,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <AuthWrapper>
      <Collections urlName={urlName} />
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

export default CollectionsPage
