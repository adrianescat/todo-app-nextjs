import { NextPage, GetServerSideProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import CollectionById from '../../src/PagesComponents/CollectionById'
import AuthWrapper from '../../src/components/AuthWrapper'

const CollectionByIdPage: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  collectionId,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <AuthWrapper>
      <CollectionById collectionId={collectionId} />
    </AuthWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      collectionId: context?.params?.id,
    },
  }
}

export default CollectionByIdPage
