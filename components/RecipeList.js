import Recipe from "./Recipe";

export default function RecipeList({ recipes }) {
  return (
    <div className="flex-grid">
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} />
      ))}
    </div>
  );
}
