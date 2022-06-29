export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "url",
    },
    {
      name: "locale",
      title: "Locale",
      type: "string",
    },
    {
      name: "provider",
      title: "Provider",
      type: "string",
    },
    {
      name: "favoritDiet",
      title: "Favorit Diet",
      type: "string",
    },
    {
      name: "favoritIngredients",
      title: "Favorit Ingredients",
      type: "array",
      of: [
        {
          name: "favoritIngredient",
          title: "Favorit Ingredient",
          type: "string",
        },
      ],
    },
    {
      name: "favoritRecipes",
      title: "Favorit Recipes",
      type: "array",
      of: [
        {
          name: "favoritRecipe",
          title: "Favorit Recipe",
          type: "string",
        },
      ],
    },
  ],
};
