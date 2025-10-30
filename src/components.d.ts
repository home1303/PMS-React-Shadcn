export {}
declare global{
	const HomeRouter: typeof import('./src/controllers/homeRouter')['default']
	const Navbar: typeof import('./src/components/layout/navbar')['default']

}