export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  sizeId: string;
  colorId: string;
  size: Size;
  color: Color;
  images: Image[];
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Banner {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  parentId: string
};

export interface Parent {
  id: string,
  name: string,
  type: Type
}

export interface Type {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
