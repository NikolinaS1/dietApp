const getRecipesByFilter = async (req, res) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const selectedDiet = req.body.selectedDiet;
  const searchQuery = req.body.data.searchQuery;

  const recipes = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${selectedDiet}&number=10&titleMatch=${searchQuery}`
  ).then((response) => response.json());

  res.status(200).send(recipes);
};

export default getRecipesByFilter;
