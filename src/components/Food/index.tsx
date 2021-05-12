// {
//   "foods": [
//     {
//       "id": 1,
//       "name": "Ao molho tradicional",
//       "description": "Macarrão ao molho branco, fughi e cheiro verde das montanhas",
//       "price": "19.90",
//       "available": true,
//       "image": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png"
//     },
//     {
//       "id": 2,
//       "name": "Veggie",
//       "description": "Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.",
//       "price": "21.90",
//       "available": false,
//       "image": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png"
//     }
//   ]
// }

import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface IFood {
	id: number;
	name: string;
	description: string;
	price: string;
	available: boolean;
	image: string;
}

interface FoodProps {
	food: IFood;
	handleDelete: (id: number) => void;
	handleEditFood: (food: IFood) => void;
}

const Food = ({ food, handleDelete, handleEditFood }: FoodProps) => {
	const [isAvailable, setIsAvailable] = useState(food.available);

	const toggleAvailable = async () => {
		await api.put(`/foods/${food.id}`, {
			...food,
			available: !isAvailable,
		});

		setIsAvailable(!isAvailable);
	};

	const setEditingFood = () => {
		handleEditFood(food);
	};

	return (
		<Container available={isAvailable}>
			<header>
				<img src={food.image} alt={food.name} />
			</header>
			<section className="body">
				<h2>{food.name}</h2>
				<p>{food.description}</p>
				<p className="price">
					R$ <b>{food.price}</b>
				</p>
			</section>
			<section className="footer">
				<div className="icon-container">
					<button
						type="button"
						className="icon"
						onClick={setEditingFood}
						data-testid={`edit-food-${food.id}`}
					>
						<FiEdit3 size={20} />
					</button>

					<button
						type="button"
						className="icon"
						onClick={() => handleDelete(food.id)}
						data-testid={`remove-food-${food.id}`}
					>
						<FiTrash size={20} />
					</button>
				</div>

				<div className="availability-container">
					<p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

					<label htmlFor={`available-switch-${food.id}`} className="switch">
						<input
							id={`available-switch-${food.id}`}
							type="checkbox"
							checked={isAvailable}
							onChange={toggleAvailable}
							data-testid={`change-status-food-${food.id}`}
						/>
						<span className="slider" />
					</label>
				</div>
			</section>
		</Container>
	);
};

export default Food;