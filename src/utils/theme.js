import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(222,184,135)',
			dark: 'rgb(192,153,101)',
			light: 'rgb(192,194,155)',
			contrastText: '#654F32'
		},
		secondary: {
			main: '#A05FD3',
			dark: '#8837C8',
			light: '#B887DE',
			contrastText: '#ADDE87'
		},
		white: {
			main: '#fff',
			contrastText: '#000'
		},
		bold: {
			main: '#E1341E',
			contrastText: '#fff'
		},
		dark: {
			main: '#5a0f04',
			contrastText: '#fff'
		},
		yellow: {
			main: '#FFCB2B',
			contrastText: '#000'
		}
	}
});

export default theme;
