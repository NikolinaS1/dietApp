import React from "react";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { client } from "../../lib/sanity";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

export default function account({ logged, user }) {
  const { register, handleSubmit } = useForm();

  const [selectedDiet, setSelectedDiet] = useState([]);
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

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterIngredients, setFilterIngredients] = useState([]);

  useEffect(() => {
    handleDietSelect({ value: logged.user.diet });
  }, []);

  const handleDietSelect = async (selectedValue) => {
    const ingredients = (
      await import("../../utils/ingredients/" + selectedValue.value)
    ).default;

    const ingredientOptions = ingredients.map(function (ingredient) {
      return {
        value: ingredient.id,
        label: ingredient.name,
      };
    });

    setSelectedDiet(selectedValue);
    setFilterIngredients(ingredientOptions);
  };

  const handleIngredientSelect = async (selectedValues) => {
    setSelectedIngredients(selectedValues);
  };

  const onSubmit = async (data) => {
    data.diet = selectedDiet.value;
    data.ingredients = selectedIngredients.map(function (ingredient) {
      return ingredient.label;
    });

    const response = await fetch("/api/db/user/updateAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, userId: logged.user.id }),
    });

    const userAccount = await response.json();
  };

  return (
    <Layout logged={logged}>
      <div className="profileBox">
        <div className="profile">
          <Image
            className="profileImage"
            src={user.image}
            alt={user.name}
            width={100}
            height={100}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            type="text"
            defaultValue={user.firstName}
            {...register("firstName", { required: true })}
            placeholder="First name"
          />
          <input
            type="text"
            defaultValue={user.lastName}
            {...register("lastName", { required: true })}
            placeholder="Last name"
          />
          <input
            type="email"
            size={30}
            defaultValue={user.email}
            {...register("email", { required: true })}
            placeholder="email"
          />
          <div className="selection">
            <label>Choose a diet:</label>
            <Select
              id="diet-select"
              instanceId="diet-select"
              name="diet"
              onChange={handleDietSelect}
              options={dietOptions}
              defaultValue={{ label: user.favoritDiet }}
            />

            <label>Select prefered ingredients:</label>
            <Select
              id="ingredient-select"
              instanceId="ingredient-select"
              name={"ingredient"}
              onChange={handleIngredientSelect}
              options={filterIngredients}
              defaultValue={user.favoritIngredientOptions}
              isMulti
              placeholder="Type ingredients..."
              className="border border-1 p-1"
            />
          </div>
          <button type="submit" className="save">
            Save changes
          </button>

          {/* <div className="flex flex-wrap gap-2">
          {filterIngredients.map((ingredient) => (
            <p
              key={ingredient.id}
              onClick={() =>
                setSelectedIngredients((selectedIngredients) => [
                  ...selectedIngredients,
                  ingredient,
                ])
              }
              className="border border-1 p-2 rounded-full cursor-pointer capitalize"
            >
              {ingredient.name}
            </p>
          ))}
        </div> */}
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const logged = session;

  const userQuery = `*[_type == "user" && email == "${logged.user.email}"] [0] {
    _createdAt,
    _updatedAt,
    email,
    firstName,
    lastName,
    email,
    image,
    locale,
    provider,
    favoritDiet,
    favoritIngredients,
  }`;

  const user = await client.fetch(userQuery);

  if (user) {
    logged.user.diet = user.favoritDiet || "glutenFree";
    user.favoritIngredientOptions = [];

    if (user.favoritIngredients) {
      user.favoritIngredientOptions = user.favoritIngredients.map(function (
        ingredient
      ) {
        return {
          value: uuid(),
          label: ingredient,
        };
      });
    }
  }

  {
    return {
      props: {
        logged,
        user,
      },
    };
  }
}
