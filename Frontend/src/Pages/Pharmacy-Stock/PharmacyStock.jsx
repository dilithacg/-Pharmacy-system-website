import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import PharmacyStockAll from './widgets/PharmacyStockAll';
import PharmacyStockForm from './widgets/PharmacyStockForm';

function PharmacyStock() {
	const [pharmacyStock, setPharmacyStock] = useState([]); // pharmacyStock is an array of medicine objects
	const [pharmacyLocation, setPharmacyLocation] = useState([]); // pharmacyStock is an array of medicine objects
	const [orderID, setOrderID] = useState([]); // pharmacyStock is an array of medicine objects
	const [pharmacyStockOne, setPharmacyStockOne] = useState({}); // pharmacyStockOne is a single medicine object
	const [loading, setLoading] = useState(true);

	const fetchMedicines = async () => {
		try {
			const response1 = await GET('/pharmacy-stock');
			const response2 = await GET('/item');
			const response3 = await GET('/pharmacy');
			setPharmacyStock(response1.data);
			setOrderID(response2.data);
			setPharmacyLocation(response3.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMedicines();
	}, []);

	return (
		<div className="bg-cover bg-center bg-no-repeat h-full lg:h-screen bg-[#ffffff62]">
			<div className="flex flex-col-reverse lg:flex-row gap-4 p-10 justify-evenly">
				<div>
					<PharmacyStockAll
						pharmacyStock={pharmacyStock}
						loading={loading}
						setPharmacyStockOne={setPharmacyStockOne}
						pharmacyLocation={pharmacyLocation}
						orderID={orderID}
					/>
				</div>
				<div>
					<PharmacyStockForm
						fetchMedicines={fetchMedicines}
						pharmacyStockOne={pharmacyStockOne}
						pharmacyLocation={pharmacyLocation}
						orderID={orderID}
					/>
				</div>
			</div>
		</div>
	);
}

export default PharmacyStock;
