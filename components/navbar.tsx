import getCategories , {getParents} from "@/actions/get-categories";
import Categories from "./categories";
import MainNav from "./main-nav";
import NavbarActions from "./navbar-actions";
import Link from "next/link";
import Container from "./ui/container";

const Navbar = async () => {
  const categories = await getCategories();
  const parents = await getParents();

  return (
      <MainNav data={categories} parents={parents} />
  );
};
 
export default Navbar;
