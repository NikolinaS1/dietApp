import { getSession, signIn, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import DietsList from "../components/DietsList";

export default function Home({ logged }) {
  return (
    <Layout logged={logged}>
      <div className="container">
        <DietsList />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  // const apiKey = process.env.SPOONACULAR_API_KEY;

  {
    return {
      props: {
        logged,
      },
    };
  }
}

// export async function getServerSideProps(context) {
//   const apiKey = process.env.SPOONACULAR_API_KEY;

//   const recipes = await fetch(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
//   ).then((response) => response.json());

//   const recipesByIngredients = await fetch(
//     `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=apples,+flour,+sugar&number=2`
//   ).then((response) => response.json());

//   return {
//     props: { recipes, recipesByIngredients },
//   };
// }
