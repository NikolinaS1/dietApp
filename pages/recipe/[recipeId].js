import { getSession, signIn, signOut } from "next-auth/react";
import { client } from "../../lib/sanity";
import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import SearchIngredients from "../../components/SearchIngredients";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export default function Recipe({
  logged,
  recipe,
  getFavoritRecipes,
  isFavorite,
  queryParams,
  diet,
}) {
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(isFavorite);

  const favoritHendler = async () => {
    let newFavoritRecipes = getFavoritRecipes.favoritRecipes || [];

    const markAsFavorite = !isFavoriteRecipe;
    setIsFavoriteRecipe(markAsFavorite);

    if (markAsFavorite) {
      newFavoritRecipes.push(recipe.id.toString());
    } else {
      newFavoritRecipes = newFavoritRecipes.filter(function (favorite) {
        return favorite != recipe.id.toString();
      });
    }

    const response = await fetch("/api/db/user/updateFavoritRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe.id,
        userId: logged.user.id,
        favoritRecipes: newFavoritRecipes,
      }),
    });

    const favoritRecipes = await response.json();
  };

  return (
    <Layout logged={logged}>
      <div className="recipeTitle">
        <h1>{recipe.title}</h1>
      </div>
      <div className="buttonBack">
        <a href={`/${diet}?${queryParams}`}>Go back</a>
      </div>
      {logged ? (
        <div className="heart">
          <p>
            {isFavoriteRecipe ? (
              <FcLike onClick={favoritHendler} />
            ) : (
              <FcLikePlaceholder onClick={favoritHendler} />
            )}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="box">
        <div className="img">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={556}
            height={370}
          />
        </div>
        <div className="ingredients">
          <p>Ingredients:</p>
          <ul>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="details">
        <p>
          Servings: <span>{recipe.servings}</span>
        </p>
        <p>
          Ready in minutes: <span>{recipe.readyInMinutes}</span>
        </p>
        <p>
          Health score: <span>{recipe.healthScore}</span>
        </p>
      </div>
      <div className="instructions">
        <p>Instructions:</p>
        <ul>
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
            ? recipe.analyzedInstructions[0].steps.map((instruction) => (
                <li key={instruction.number}>{instruction.step}</li>
              ))
            : ""}
        </ul>
      </div>
    </Layout>
  );
}

// sourceUrl

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const recipeId = context.query.recipeId;

  const queryParams = context.req.url.substring(
    context.req.url.indexOf("?") + 1
  );

  const getRecipe = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true.`
  ).then((res) => res.json());

  let isFavorite = false;
  let getFavoritRecipes = [];

  if (logged) {
    const getFavoritRecipesQuery = `*[_type == "user" && email == "${logged.user.email}"] [0] {
      favoritRecipes
    }`;

    getFavoritRecipes = await client.fetch(getFavoritRecipesQuery);

    if (!getFavoritRecipes.favoritRecipes) {
      getFavoritRecipes.favoritRecipes = [];
    }

    if (!Array.isArray(getFavoritRecipes.favoritRecipes)) {
      getFavoritRecipes.favoritRecipes = [getFavoritRecipes.favoritRecipes];
    }

    isFavorite = getFavoritRecipes.favoritRecipes.includes(
      getRecipe.id.toString()
    );
  }

  if (logged) {
    const userQuery = `*[_type == "user" && email == "${logged.user.email}"] [0] {
      favoritDiet
    }`;

    const user = await client.fetch(userQuery);
    logged.user.diet = user.favoritDiet;
  }

  {
    return {
      props: {
        logged,
        recipe: getRecipe,
        getFavoritRecipes,
        isFavorite: isFavorite,
        queryParams: queryParams,
        diet: context.query.diet || "glutenFree",
      },
    };
  }
}
