interface IMode {
	sub_color: string
	main_color: string
	product_card_bg: string
	product_card_bg_active: string
}

const darkMode: IMode = {
	sub_color: '#C4CDD5',
	main_color: '#FFFFFF',
	product_card_bg: '#212B36',
	product_card_bg_active: '#0E1010',
}

const lightMode: IMode = {
	main_color: '#fff',
	sub_color: '#eceff1',
	product_card_bg: '#4862EA',
	product_card_bg_active: '#4439C5',
}

export { darkMode, lightMode }