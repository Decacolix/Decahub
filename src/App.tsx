import Footer from './components/layout/Footer';
import Grid from './components/layout/Grid';
import Menu from './components/layout/Menu';
//import Test from './Test';

const App = () => {
	return (
		<div className="bg-[url(./assets/backgrounds/background-pink.svg)] bg-no-repeat bg-cover h-screen">
			<Menu />
			<Grid />
			<Footer />
		</div>
	);
};

export default App;
