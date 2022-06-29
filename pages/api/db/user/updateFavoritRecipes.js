import { client } from "../../../../lib/sanity";

const updateFavoritRecipes = async (req, res) => {
  try {
    const updateFavoritRecipes = await client
      .patch(req.body.userId)
      .set({
        favoritRecipes: req.body.favoritRecipes,
      })
      .commit();

    res.status(200).send(updateFavoritRecipes);
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default updateFavoritRecipes;

// Ovo radi tako što zamjeni u bazi sve podatke
// Npr. ako array sadrži samo jedan recept, onda se spremi u bazu samo taj jedan,
// a ako sadrži više, onda se spremi više. Uglavnom spremi se array.
