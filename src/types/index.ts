export type CategorySlug =
  | "shampoo"
  | "conditioner"
  | "hair-masks"
  | "serums-oils"
  | "personal-care"
  | "wellness";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  category: CategorySlug;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  ingredients: string[];
  howToUse: string;
  inStock: boolean;
  badge?: string;
  size: string;
  featured?: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  tint: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

export interface OrderPayload {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
