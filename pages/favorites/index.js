import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../lib/sanity";

export default function favorites({ logged, recipes }) {
  return (
    <Layout logged={logged}>
      <div className="favoritePage">
        {/* Result */}
        {recipes.length > 0 ? (
          <div className="flex-grid">
            {recipes.map((recipe, index) => (
              <div key={recipe.id}>
                <Link href={`/recipe/${recipe.id}`}>
                  <a>
                    <div className="card">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={331}
                        height={231}
                        className="image"
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                      />
                      <h3 className="title">{recipe.title}</h3>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="favorite">
            <h3 className="title">You have no favorite recipes!</h3>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  console.log("favorite page", logged);
  const getFavoritRecipesQuery = `*[_type == "user" && email == "${logged.user.email}"] [0] {
    favoritRecipes
  }`;

  let favoriteRecipesData = [];
  const getFavoritRecipes = await client.fetch(getFavoritRecipesQuery);

  if (getFavoritRecipes.favoritRecipes) {
    const favoriteRecipeIds = getFavoritRecipes.favoritRecipes.join(",");

    if (favoriteRecipeIds) {
      let fetchUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${favoriteRecipeIds}`;
      favoriteRecipesData = await fetch(fetchUrl).then((response) =>
        response.json()
      );
    }
  }

  const userQuery = `*[_type == "user" && email == "${logged.user.email}"] [0] {
    favoritDiet
  }`;

  const user = await client.fetch(userQuery);

  if (logged) {
    logged.user.diet = user.favoritDiet;
  }

  {
    return {
      props: {
        logged,
        recipes: favoriteRecipesData,
      },
    };
  }
}
