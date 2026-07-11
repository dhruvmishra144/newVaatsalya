import MenuPage from '../../components/MenuPage';
import { PRODUCTS_DATA } from '../../productsData';

export const metadata = {
  title: 'Products | Vaatsalya Foods',
};

export default function Products() {
  return <MenuPage products={PRODUCTS_DATA} />;
}
