export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  price: number;
  weight: number; // dry weight in grams
  makesWeight: number; // prepared food weight in grams
  prepTime: string;
  chefTag: string;
  rating: number;
  reviews: number;
  isVeg: boolean;
  isGlutenFree: boolean;
  isSpicy: 'Mild' | 'Medium' | 'Spicy';
  description: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    sodium: string;
  };
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
