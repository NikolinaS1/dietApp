import Link from "next/link";
import Image from "next/image";

export default function Recipe({ recipe }) {
  return (
    <Link href={recipe.url} key={recipe.id}>
      <a>
        <div className="card">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={331}
            height={231}
            className="image"
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
  );
}
