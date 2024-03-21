import { Category, Parent } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;
const URLP=`${process.env.NEXT_PUBLIC_API_URL}/parents`;


const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  return res.json();
};

export const getParents = async (): Promise<Parent[]> => {
  const res = await fetch(URLP);

  return res.json();
};

export default getCategories;

