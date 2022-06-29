import { getSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Recipe({ logged, recipes }) {
  const router = useRouter();
  // const selectedDiet = router.query.recipes;

  const [isRecipes, setRecipes] = useState(recipes);

  const options = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const selectedDiet = router.query.recipes;
    const response = await fetch("/api/getRecipesByFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, selectedDiet }),
    });
    const result = await response.json();
    setRecipes(result);
  };

  return (
    <Layout logged={logged}>
      <div>
        <h1 className="text-center">Recipe By Diet</h1>
        {/* <SearchIngredients /> */}

        {/* Search */}
        <div className="searchIngredients">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="text" name="name" className="search" /> */}
            <input
              {...register("searchQuery")}
              type="text"
              placeholder="Type a recipe"
            />

            <input type="submit" value="SEARCH" className="submit" />
          </form>
        </div>
      </div>
      <div className="flex">
        {/*  Filter */}
        <div className="filter-recipes">
          <p className="title">Filter</p>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <label>Cuisine</label>
            <input {...register("cuisine")} placeholder="italian" />

            <label>Exclude Cuisine</label>
            <input {...register("excludeCuisine")} placeholder="greek" />

            <label>Intolerances</label>
            <input {...register("intolerances")} placeholder="gluten" />

            <label>Equipment</label>
            <input {...register("equipment")} placeholder="pan" />

            <label>Include Ingredients</label>
            <input
              {...register("includeIngredients")}
              placeholder="tomato, cheese"
            />

            <label>Exclude Ingredients</label>
            <input {...register("excludeIngredients")} placeholder="eggs" />

            <label>The type of recipe</label>
            <input {...register("type")} placeholder="main course" />

            <label className="tooltip">
              Instructions Required
              <span class="tooltiptext">
                Whether the recipes must have instructions.
              </span>
            </label>

            <div className="input-radio">
              {options.map((option) => (
                <>
                  <span>{option.name}</span>

                  <input
                    {...register("instructionsRequired")}
                    type="radio"
                    value={option.value}
                  />
                </>
              ))}
            </div>
            {/* <label>Instructions Required</label>
            <input {...register("instructionsRequired")} type="radio" /> */}
            {/* <input {...register("instructionsRequired")} placeholder="true" /> */}

            <label>Fill Ingredients</label>
            <input {...register("fillIngredients")} placeholder="false" />

            <label>Add Recipe Information</label>
            <input {...register("addRecipeInformation")} placeholder="false" />

            <label>Add Recipe Nutrition</label>
            <input {...register("addRecipeNutrition")} placeholder="false" />

            <label>Max Ready Time</label>
            <input {...register("maxReadyTime")} placeholder="20" />

            <label>Sort</label>
            <input {...register("sort")} placeholder="calories" />

            <label>Sort</label>
            <input {...register("sort")} placeholder="calories" />

            <label>Min Carbs</label>
            <input {...register("minCarbs")} placeholder="10" />

            <label>Max Carbs</label>
            <input {...register("maxCarbs")} placeholder="100" />

            <label>Min Protein</label>
            <input {...register("minProtein")} placeholder="10" />

            <label>Max Protein</label>
            <input {...register("mixProtein")} placeholder="100" />

            <label>Min Calories</label>
            <input {...register("minCalories")} placeholder="50" />

            <label>Max Calories</label>
            <input {...register("mixCalories")} placeholder="800" />

            <label>Min Fat</label>
            <input {...register("minFat")} placeholder="1" />

            <label>Max Fat</label>
            <input {...register("mixFat")} placeholder="100" />

            <label>Min Alcohol</label>
            <input {...register("minAlcohol")} placeholder="0" />

            <label>Max Alcohol</label>
            <input {...register("mixAlcohol")} placeholder="100" />

            <label>Min Caffeine</label>
            <input {...register("minCaffeine")} placeholder="0" />

            <label>Max Caffeine</label>
            <input {...register("mixCaffeine")} placeholder="100" />

            <label>Min Copper</label>
            <input {...register("minCopper")} placeholder="0" />

            <label>Max Copper</label>
            <input {...register("mixCopper")} placeholder="100" />

            <label>Min Choline</label>
            <input {...register("minCholine")} placeholder="0" />

            <label>Max Choline</label>
            <input {...register("mixCholine")} placeholder="100" />

            <label>Min Cholesterol</label>
            <input {...register("minCholesterol")} placeholder="0" />

            <label>Max Cholesterol</label>
            <input {...register("mixCholesterol")} placeholder="100" />

            <label>Min Fluoride</label>
            <input {...register("minFluoride")} placeholder="0" />

            <label>Max Fluoride</label>
            <input {...register("mixFluoride")} placeholder="100" />

            <label>Min Saturated Fat</label>
            <input {...register("minSaturatedFat")} placeholder="0" />

            <label>Max Saturated Fat</label>
            <input {...register("mixSaturatedFat")} placeholder="100" />

            <label>Min Vitamin A</label>
            <input {...register("minVitaminA")} placeholder="0" />

            <label>Max Vitamin A</label>
            <input {...register("mixVitaminA")} placeholder="100" />

            <label>Min Vitamin C</label>
            <input {...register("minVitaminC")} placeholder="0" />

            <label>Max Vitamin C</label>
            <input {...register("mixVitaminC")} placeholder="100" />

            <label>Min Vitamin D</label>
            <input {...register("minVitaminD")} placeholder="0" />

            <label>Max Vitamin D</label>
            <input {...register("mixVitaminD")} placeholder="100" />

            <label>Min Vitamin E</label>
            <input {...register("minVitaminE")} placeholder="0" />

            <label>Max Vitamin E</label>
            <input {...register("mixVitaminE")} placeholder="100" />

            <label>Min Vitamin K</label>
            <input {...register("minVitaminK")} placeholder="0" />

            <label>Max Vitamin K</label>
            <input {...register("mixVitaminK")} placeholder="100" />

            <label>Min Vitamin B1</label>
            <input {...register("minVitaminB1")} placeholder="0" />

            <label>Max Vitamin B1</label>
            <input {...register("mixVitaminB1")} placeholder="100" />

            <label>Min Vitamin B2</label>
            <input {...register("minVitaminB2")} placeholder="0" />

            <label>Max Vitamin B2</label>
            <input {...register("mixVitaminB2")} placeholder="100" />

            <label>Min Vitamin B5</label>
            <input {...register("minVitaminB5")} placeholder="0" />

            <label>Max Vitamin B5</label>
            <input {...register("mixVitaminB5")} placeholder="100" />

            <label>Min Vitamin B3</label>
            <input {...register("minVitaminB3")} placeholder="0" />

            <label>Max Vitamin B3</label>
            <input {...register("mixVitaminB3")} placeholder="100" />

            <label>Min Vitamin B6</label>
            <input {...register("minVitaminB6")} placeholder="0" />

            <label>Max Vitamin B6</label>
            <input {...register("mixVitaminB6")} placeholder="100" />

            <label>Min Vitamin B12</label>
            <input {...register("minVitaminB12")} placeholder="0" />

            <label>Max Vitamin B12</label>
            <input {...register("mixVitaminB12")} placeholder="100" />

            <label>Min Fiber</label>
            <input {...register("minFiber")} placeholder="0" />

            <label>Max Fiber</label>
            <input {...register("mixFiber")} placeholder="100" />

            <label>Min Folate</label>
            <input {...register("minFolate")} placeholder="0" />

            <label>Max Folate</label>
            <input {...register("mixFolate")} placeholder="100" />

            <label>Min Folic Acid</label>
            <input {...register("minFolicAcid")} placeholder="0" />

            <label>Max Folic Acid</label>
            <input {...register("mixFolicAcid")} placeholder="100" />

            <label>Min Iodine</label>
            <input {...register("minIodine")} placeholder="0" />

            <label>Max Iodine</label>
            <input {...register("mixIodine")} placeholder="100" />

            <label>Min Iron</label>
            <input {...register("minIron")} placeholder="0" />

            <label>Max Iron</label>
            <input {...register("mixIron")} placeholder="100" />

            <label>Min Magnesium</label>
            <input {...register("minMagnesium")} placeholder="0" />

            <label>Max Magnesium</label>
            <input {...register("mixMagnesium")} placeholder="100" />

            <label>Min Manganese</label>
            <input {...register("minManganese")} placeholder="0" />

            <label>Max Manganese</label>
            <input {...register("mixManganese")} placeholder="100" />

            <label>Min Phosphorus</label>
            <input {...register("minPhosphorus")} placeholder="0" />

            <label>Max Phosphorus</label>
            <input {...register("mixPhosphorus")} placeholder="100" />

            <label>Min Potassium</label>
            <input {...register("minPotassium")} placeholder="0" />

            <label>Max Potassium</label>
            <input {...register("mixPotassium")} placeholder="100" />

            <label>Min Selenium</label>
            <input {...register("minSelenium")} placeholder="0" />

            <label>Max Selenium</label>
            <input {...register("mixSelenium")} placeholder="100" />

            <label>Min Sodium</label>
            <input {...register("minSodium")} placeholder="0" />

            <label>Max Sodium</label>
            <input {...register("mixSodium")} placeholder="100" />

            <label>Min Sugar</label>
            <input {...register("minSugar")} placeholder="0" />

            <label>Max Sugar</label>
            <input {...register("mixSugar")} placeholder="100" />

            <label>Min Zinc</label>
            <input {...register("minZinc")} placeholder="0" />

            <label>Max Zinc</label>
            <input {...register("mixZinc")} placeholder="100" />

            <input type="submit" />
          </form>
        </div>
        {/* End Filter */}

        {/* Result */}
        <div className="flex-grid">
          {isRecipes.results.map((recipe, index) => (
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
          ))}
        </div>
        {/* End Result */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const selectedDiet = context.query.recipes || null;

  const getRecipes = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${selectedDiet}&number=10`
  ).then((response) => response.json());

  {
    return {
      props: {
        logged,
        recipes: getRecipes,
      },
    };
  }
}
