import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSide from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import NavBar from './Components/Navigation/NavBar';
import Medicine from './Pages/Medicine/Medicine';
import Pharmacy from './Pages/Pharmacy/Pharmacy';
import PharmacyPrice from './Pages/Pharmacy-Price/PharmacyPrice';
import PharmacyStock from './Pages/Pharmacy-Stock/PharmacyStock';
import Registration from './Pages/Login/Registration';
import Bills from './Pages/Bills/Bills';

function App() {
	const user = JSON?.parse(localStorage?.getItem('user'));
	return (
		<BrowserRouter>
			{localStorage.getItem('token') && <NavBar />}
			<Routes>
				<Route path="/Registration" element={<Registration />} />
				{!localStorage.getItem('token') && <Route path="/" element={<SignInSide />} />}
				{localStorage.getItem('token') && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/Pharmacy" element={<Pharmacy />} />
						<Route path="/Bills" element={<Bills />} />
						{user.role !== 2 && (
							<>
								<Route path="/Medicine" element={<Medicine />} />
								<Route path="/PharmacyPrice" element={<PharmacyPrice />} />
								<Route path="/PharmacyStock" element={<PharmacyStock />} />
							</>
						)}
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
