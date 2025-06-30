import { alpha, paginationItemClasses, Theme } from '@mui/material'

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error']

const Pagination = (theme: Theme) => {
	const isLight = theme.palette.mode === 'light'

	const rootStyles = ownerState => {
		const defaultColor = ownerState.color === 'standard'

		const filledVariant = ownerState.variant === 'text'

		const outlinedVariant = ownerState.variant === 'outlined'

		const softVariant = ownerState.variant === 'soft'

		const defaultStyle = {
			[`& .${paginationItemClasses.root}`]: {
				...(outlinedVariant && {
					borderColor: alpha(theme.palette.grey[500], 0.24),
				}),

				[`&.${paginationItemClasses.selected}`]: {
					fontWeight: theme.typography.fontWeightSemiBold,
					...(outlinedVariant && {
						borderColor: 'currentColor',
					}),

					...(defaultColor && {
						backgroundColor: alpha(theme.palette.grey[500], 0.08),
						...(filledVariant && {
							backgroundColor: theme.palette.text.primary,
							color: isLight ? theme.palette.common.white : theme.palette.grey[800],
							'&:hover': {
								backgroundColor: isLight ? theme.palette.grey[700] : theme.palette.grey[100],
							},
						}),
					}),
				},
			},
		}

		const colorStyle = COLORS.map(color => ({
			...(ownerState.color === color && {
				[`& .${paginationItemClasses.root}`]: {
					[`&.${paginationItemClasses.selected}`]: {
						...(ownerState.color === color && {
							// SOFT
							...(softVariant && {
								color: theme.palette[color][isLight ? 'dark' : 'light'],
								backgroundColor: alpha(theme.palette[color].main, 0.08),
								'&:hover': {
									backgroundColor: alpha(theme.palette[color].main, 0.16),
								},
							}),
						}),
					},
				},
			}),
		}))

		return [defaultStyle, ...colorStyle]
	}

	return {
		MuiPagination: {
			styleOverrides: {
				root: ({ ownerState }) => rootStyles(ownerState),
			},
		},
	}
}

export default Pagination
