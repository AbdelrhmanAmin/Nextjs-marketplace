import React from 'react'
import { Stack, ImageViewer } from '@components/ui'
import type { ICard } from '@components/ui'
import { Coin } from '@components/icons'
import { useUI } from '@state'
import cn from 'classnames'
import s from './Product.module.css'
import formatDate from 'utils/formatDate'
import CollectionGrid from './CollectionGrid'
import ProductPayment from './ProductPayment'
import ProductBoxSkeleton from './ProductBoxSkeleton'
import ProductDescription from './ProductDescription'

interface IProductDetails {
  id: number
  origin: { name: string }
  location: { name: string }
  species: string
  gender: string
  created: string
}

const ProductDetails = ({
  details,
  isLoading,
}: {
  details: IProductDetails
  isLoading?: boolean
}) => {
  return (
    <div className={s.productBox}>
      <div>
        <strong>📒 Details</strong>
      </div>
      <ul className={s.maxHeight}>
        {isLoading ? (
          <ProductBoxSkeleton num={10} />
        ) : (
          Object.entries(details).map(([key, value]) => {
            let val
            if (typeof value === 'object') {
              val = value.name
            } else {
              if (key === 'created') {
                val = formatDate(value)
              } else {
                val = value
              }
            }
            return (
              <li className="flex justify-between" key={key}>
                <span>{key}</span>
                <span className="text-gray-700">{val}</span>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

const ProductActivity = ({
  episode,
  isLoading,
}: Pick<IProductPage, 'episode' | 'isLoading' | 'className'>) => {
  return (
    <div className={s.productBox}>
      <div>
        <strong>📈 Activity</strong>
      </div>
      <ul className={s.maxHeight}>
        {isLoading ? (
          <ProductBoxSkeleton num={10} />
        ) : (
          episode &&
          episode.map(({ name }) => {
            return (
              <li className="flex justify-between" key={name}>
                <span>Episode Name:</span>
                <span className="text-gray-700">{name}</span>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

interface IProductHeader
  extends Pick<IProductPage, 'price' | 'name' | 'className' | 'isLoading'> {
  screen: 'desktop' | 'mobile'
}
const ProductHeader = ({
  price,
  name,
  isLoading,
  screen,
  className,
}: IProductHeader) => {
  const memoizedPrice = React.useMemo(
    () => Math.floor(Math.random() * 1000) + 1,
    []
  )
  return (
    <div className={cn(s.productHeader, screen && s[screen], className)}>
      <h1>{isLoading ? '--------' : name}</h1>
      <div className={s.priceContainer}>
        <span>
          <Coin />
        </span>
        <span>{isLoading ? '000' : price || memoizedPrice}</span>
      </div>
    </div>
  )
}

const ProductPreview = ({
  media,
  status,
  isLoading,
}: Pick<IProductPage, 'media' | 'status' | 'className' | 'isLoading'>) => {
  const { openFullPreview } = useUI()
  return (
    <Stack className="rounded-lg shadow-lg overflow-hidden">
      <div role="button" onClick={() => !isLoading && openFullPreview(media)}>
        <ImageViewer variant="Product" media={media} isLoading={isLoading} />
      </div>
      <div className="flex items-center justify-between text-white bg-yellow-800 p-3">
        <div className="flex items-center space-x-2">
          <span>Status: </span>

          <span className="font-semibold text-yellow-400">
            {isLoading ? '----' : status}
          </span>
        </div>
        <div role="button" onClick={() => !isLoading && openFullPreview(media)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.3}
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
          </svg>
        </div>
      </div>
    </Stack>
  )
}

export interface IProductPage extends IProductDetails {
  media: string
  name: string
  price: number
  status?: string
  className?: string
  episode: { name: string }[]
  isLoading?: boolean
}

const ProductPage = ({
  media,
  name,
  price,
  status,
  id,
  gender,
  origin,
  location,
  species,
  episode,
  created,
  isLoading,
  cards,
}: IProductPage & { cards: ICard[] }) => {
  const details: IProductDetails = {
    id,
    gender,
    origin,
    location,
    species,
    created,
  }

  return (
    <section className="space-y-4">
      <div className={s.container}>
        <div className={cn(s.centered, s.leftColumn)}>
          <ProductHeader
            isLoading={isLoading}
            name={name}
            price={price}
            screen="mobile"
            className="mb-4"
          />
          <div className="w-fit mx-auto">
            <ProductPreview
              media={media}
              status={status}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className={cn(s.rightColumn)}>
          <ProductHeader
            name={name}
            price={price}
            screen="desktop"
            isLoading={isLoading}
          />
          <ProductPayment />
          <ProductDescription isLoading={isLoading} />
        </div>
      </div>
      <div className={s.container}>
        <div className={cn(s.centered, s.leftColumn)}>
          <ProductDetails details={details} isLoading={isLoading} />
        </div>
        <div className={cn(s.centered, s.rightColumn)}>
          <ProductActivity episode={episode} isLoading={isLoading} />
        </div>
      </div>
      {cards && (
        <div className={s.container}>
          <div className={cn(s.centered, s.middle)}>
            <CollectionGrid cards={cards} isLoading={isLoading} />
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductPage
