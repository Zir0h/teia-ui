import { useMemo } from 'react'
import { gql } from 'graphql-request'
import random from 'lodash/random'
import { BaseTokenFieldsFragment } from '../../data/api'
import { HEN_CONTRACT_FA2 } from '../../constants'
import TokenCollection from '../../components/token-collection'

// lastId should be updated every once in a while
function RandomFeed({ firstId = 196, lastId = 797535, max = 200 }) {
  const tokenIds = useMemo(() => {
    const uniqueIds = new Set()

    while (uniqueIds.size < max) {
      uniqueIds.add(`${random(firstId, lastId)}`)
    }

    return Array.from(uniqueIds)
  }, [firstId, lastId, max])

  return (
    <TokenCollection
      namespace="random-feed"
      enableInfinityScroll={false}
      variables={{ tokenIds }}
      maxItems={200}
      query={gql`
        ${BaseTokenFieldsFragment}
        query Objkts($tokenIds: [String!] = "", $limit: Int!) {
          tokens(where: { token_id: { _in: $tokenIds }, editions: { _neq: 0 }, fa2_address: { _eq: "${HEN_CONTRACT_FA2}" } }, limit: $limit) {
            ...baseTokenFields
          }
        }
      `}
    />
  )
}

export default RandomFeed
