const findByIngredients = async (req, res) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const ingredients = req.body.ingredients;

  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=6`
    // `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=apples,+flour,+sugar&number=2`
  ).then((res) => res.json());

  res.status(200).send(response);
};

export default findByIngredients;
