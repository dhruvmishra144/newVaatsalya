import HomePage from '../components/HomePage';
import { PRODUCTS_DATA } from '../productsData';

export const metadata = {
  title: 'Home | Vaatsalya Foods',
};

export default function Home() {
  return <HomePage products={PRODUCTS_DATA} />;
}
