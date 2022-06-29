import { client } from "../../../../lib/sanity";

const updateAccount = async (req, res) => {
  try {
    const updateAccount = await client
      .patch(req.body.userId)
      .set({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        favoritDiet: req.body.data.diet,
        favoritIngredients: req.body.data.ingredients,
      })
      .commit();

    res.status(200).send(updateAccount);
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default updateAccount;
