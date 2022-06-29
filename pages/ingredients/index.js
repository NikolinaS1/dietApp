import { getSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import AllIngredients from "../../utils/AllIngredients";

//https://api.spoonacular.com/recipes/findByIngredients

export default function index({ logged }) {
  const [recipes, setRecipes] = useState([]);
  const [FilterIngredients, setFilterIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [favoriteRecipe, setfavoriteRecipe] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const ingredients = selectedIngredients.map(
      (ingredient) => ingredient.name
    );
    const response = await fetch("/api/findByIngredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
    const result = await response.json();
    setRecipes(result);
  };

  const hendleFilter = (event) => {
    const values = event.target.value.toLowerCase().split(" ");
    const keys = ["name"];

    const Ingredients = AllIngredients.filter((name) => {
      return values.every((value) =>
        keys.some((key) => name[key].toLowerCase().includes(value))
      );
    });

    setFilterIngredients(Ingredients);
  };

  return (
    <Layout logged={logged}>
      <div>
        <h1 className="text-center">Search Recipes by Ingredients</h1>
        <p className="">
          {`Ever wondered what recipes you can cook with the ingredients you have
          in your fridge or pantry? This endpoint lets you find recipes that
          either maximize the usage of ingredients you have at hand (pre
          shopping) or minimize the ingredients that you don't currently have
          (post shopping). Find recipes that use as many of the given
          ingredients as possible and require as few additional ingredients as
          possible. This is a "what's in your fridge" API endpoint.`}
        </p>

        {/* Search */}
        <div className="searchIngredients">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="selected-ingredient">
              {selectedIngredients.map((ingredient) => (
                <p key={ingredient.id} className="ingredient">
                  {ingredient.name}
                </p>
              ))}
            </div>
            {/* <input type="text" name="name" className="search" /> */}

            <input
              {...register("ingredients")}
              onChange={hendleFilter}
              type="text"
              placeholder="Type a ingredients..."
            />

            <input type="submit" value="SEARCH" className="submit" />
          </form>

          <div className="filter-ingredients">
            {FilterIngredients.map((ingredient) => (
              <p
                key={ingredient.id}
                onClick={() =>
                  setSelectedIngredients((selectedIngredients) => [
                    ...selectedIngredients,
                    ingredient,
                  ])
                }
                // setSelectedIngredients((selectedIngredients) => [...selectedIngredients, ingredient]);
                className="ingredient"
              >
                {ingredient.name}
              </p>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex-grid">
          {recipes.map((recipe, index) => (
            <div>
              <Link href={`recipe/${recipe.id}`}>
                <a>
                  <div key={recipe.id} className="card">
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
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const findByIngredients = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}`
    // `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=apples,+flour,+sugar&number=2`
  ).then((response) => response.json());

  {
    return {
      props: {
        logged,
      },
    };
  }
}
