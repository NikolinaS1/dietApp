import { getSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuid } from "uuid";

export default function recipe({
  logged,
  selectedDiet,
  recipesByIngredients,
  selectedIngredientItems,
}) {
  const [recipes, setRecipes] = useState(recipesByIngredients);
  const [filterIngredients, setFilterIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    selectedIngredientItems
  );
  const [searchTerm, setSearchTerm] = useState([]);

  const [dietOptions, setDietOptions] = useState([
    { value: "glutenFree", label: "Gluten Free" },
    { value: "ketogenic", label: "Ketogenic" },
    { value: "lactoVege", label: "Lacto Vege" },
    { value: "vegan", label: "Vege" },
    { value: "lowFodmap", label: "Low Fodmap" },
    { value: "ovoVege", label: "Ovo Vege" },
    { value: "paleo", label: "Paleo" },
    { value: "pescetarian", label: "Pescetarian" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "Whole30", label: "Whole 30" },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getRecipesByIngredients = async (ingredients) => {
    const response = await fetch("/api/findByIngredients?number=15", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const result = await response.json();

    const recipes = result.map(function (recipe) {
      recipe.url = `/recipe/${recipe.id}${window.location.search}&diet=${selectedDiet}`;
      return recipe;
    });

    return recipes;
  };

  const onSubmit = async () => {
    setSearchTerm("");

    const ingredients = selectedIngredients.map(
      (ingredient) => ingredient.name
    );

    window.history.replaceState(
      {},
      null,
      window.location.origin +
        window.location.pathname +
        "?ingredients=" +
        ingredients.join(",")
    );

    const recipes = await getRecipesByIngredients(ingredients);
    setRecipes(recipes);
  };

  const hendleFilter = async (event) => {
    const values = event.target.value.toLowerCase().split(" ");
    const keys = ["name"];

    setSearchTerm(event.target.value);

    const ingredients = (
      await import("../../utils/ingredients/" + selectedDiet)
    ).default;

    setFilterIngredients(
      ingredients.filter((name) => {
        return values.every((value) =>
          keys.some((key) => name[key].toLowerCase().includes(value))
        );
      })
    );

    if (event.target.value === "") setFilterIngredients([]);
  };

  const removeSelectedIngredient = async (ingredient) => {
    const id = ingredient.id;

    const newSelectedIngredientItems = selectedIngredients.filter(
      (item) => item.id != id
    );

    setSelectedIngredients(newSelectedIngredientItems);
  };

  return (
    <Layout logged={logged}>
      <div className="searchPage">
        <div className="titleSearch">
          <h1>Search Recipes by Ingredients</h1>
        </div>
        {/* Search */}
        <div className="searchIngredients">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="selected-ingredient">
              {selectedIngredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredient">
                  <p>{ingredient.name}</p>
                  <span onClick={() => removeSelectedIngredient(ingredient)}>
                    x
                  </span>
                </div>
              ))}
            </div>
            {/* <input type="text" name="name" className="search" /> */}

            <input
              {...register("ingredients")}
              onChange={hendleFilter}
              type="text"
              placeholder="Type ingredients..."
              value={searchTerm || ""}
            />

            <input type="submit" value="SEE RECIPES" className="submit" />
          </form>

          {searchTerm ? (
            <div className="filter-ingredients">
              {filterIngredients.map((ingredient) => (
                <p
                  key={ingredient.id}
                  onClick={() => {
                    if (!selectedIngredients.includes(ingredient)) {
                      setSelectedIngredients((selectedIngredients) => [
                        ...selectedIngredients,
                        ingredient,
                      ]);
                    }
                  }}
                  className="ingredient"
                >
                  {ingredient.name}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Result */}
        <div className="flex-grid">
          {recipes.map((recipe, index) => (
            <div key={recipe.id}>
              <Link href={recipe.url}>
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
                  <div className="missedIngredients">
                    <h4>Missed ingredients:</h4>
                    {recipe.missedIngredients.map((missedIngredient, index) => (
                      <p key={index}>{missedIngredient.name}</p>
                    ))}
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const queryParams = context.req.url.substring(
    context.req.url.indexOf("?") + 1
  );

  const selectedDiet = context.query.recipes;

  const ingredients = context.query.ingredients;
  let findByIngredients = [];

  if (ingredients) {
    let fetchUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=15`;

    findByIngredients = await fetch(fetchUrl).then((response) =>
      response.json()
    );
  }

  if (logged) {
    logged.user.diet = selectedDiet;
  }

  let ingredientArray = [];

  if (ingredients) {
    ingredientArray = ingredients.split(",").map(function (ingredient) {
      return {
        id: uuid(),
        name: ingredient,
      };
    });
  }

  const recipesByIngredients = findByIngredients.map(function (recipe) {
    recipe.url = `/recipe/${recipe.id}?${queryParams}&diet=${selectedDiet}`;
    return recipe;
  });

  {
    return {
      props: {
        logged,
        selectedDiet,
        recipesByIngredients: recipesByIngredients,
        selectedIngredientItems: ingredientArray,
      },
    };
  }
}
