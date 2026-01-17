export enum Category {
  RECOMMEND = "推荐",
  HOT = "热门",
  NEW = "最新",
}

export enum Attribute {
  FLEECE = "FLEECE",
  NORMAL = "REGULAR",
}

export enum Fit {
  CUFFED = "CUFFED",
  STRAIGHT = "STRAIGHT",
  HAREM = "HAREM",
  TAPERED = "TAPERED",
  OVERSIZED = "OVERSIZED",
  LOOSE = "LOOSE",
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  attribute: Attribute;
  fit: Fit;
  price: number;
  originalPrice: number;
  sales: number;
  isNew: boolean;
  images: string[];
  tags: string[];
  description: string;
  material: string;
  colors: string[];
  sizes: string[];
  detailImages?: string[];
  isComingSoon?: boolean;
  tmallUrl: string;
}

export interface Testimonial {
  id: number;
  user: string;
  rating: number;
  comment: string;
}
