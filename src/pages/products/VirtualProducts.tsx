import { IProduct } from '@/store/products'
import { FC, useMemo, useRef } from 'react'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import Product from './Product'

const VirtualProducts: FC<{ products: IProduct[] }> = ({ products }) => {
	const parentRef = useRef<HTMLDivElement>(null)

	const theme = useTheme()

	const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

	const columnCount = isMdUp ? 3 : isSmUp ? 2 : 1

	const rowCount = useMemo(() => Math.ceil(products.length / columnCount), [products, columnCount])

	const virtualizer = useVirtualizer({
		count: rowCount,
		estimateSize: () => 120,
		getScrollElement: () => parentRef.current,
	})

	return (
		<Stack
			ref={parentRef}
			style={{
				width: '100%',
				height: '80vh',
				overflowY: 'auto',
				contain: 'strict',
			}}
		>
			<div
				style={{
					width: '100%',
					position: 'relative',
					height: virtualizer.getTotalSize(),
				}}
			>
				<div
					style={{
						top: 0,
						left: 0,
						width: '100%',
						position: 'absolute',
						transform: `translateY(${virtualizer.getVirtualItems()[0]?.start ?? 0}px)`,
					}}
				>
					{virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
						const itemsInRow: JSX.Element[] = []
						const startIndex = virtualRow.index * columnCount

						for (let i = 0; i < columnCount; i++) {
							const itemIndex = startIndex + i
							const item = products[itemIndex]

							if (item) {
								itemsInRow.push(
									<div key={itemIndex} style={{ flex: 1, padding: '6px' }}>
										<Product data={products[itemIndex]} />
									</div>,
								)
							} else {
								itemsInRow.push(<div key={`empty-${i}`} style={{ flex: 1 }} />)
							}
						}

						return (
							<div key={virtualRow.key} data-index={virtualRow.index} ref={virtualizer.measureElement} style={{ width: '100%', display: 'flex' }}>
								{itemsInRow}
							</div>
						)
					})}
				</div>
			</div>
		</Stack>
	)
}

export default VirtualProducts
