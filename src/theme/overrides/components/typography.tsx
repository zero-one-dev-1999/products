import { Theme } from '@mui/material'

const Typography = (theme: Theme) => ({
	MuiTypography: {
		styleOverrides: {
			paragraph: {
				marginBottom: theme.spacing(2),
			},
			gutterBottom: {
				marginBottom: theme.spacing(1),
			},
		},
	},
})

export default Typography
