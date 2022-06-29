import allDiet from "../utils/allDiet";
import Link from "next/link";
import Image from "next/image";

export default function DietsList() {
  return (
    <div className="diet">
      <h2>Choose a diet.</h2>
      <div>
        {allDiet.map((diet) => (
          <Link href={'/' + diet.query} key={diet.id}>
            <a>
              <div className="item">
                <Image
                  // src="/images/glutenFree.jpg"
                  src={diet.image}
                  alt={diet.name}
                  width={300}
                  height={300}
                  className="image"
                />
                <div className="overlay">
                  <div className="dietDescription">
                    <h3>{diet.name}</h3>
                    <p>{diet.description}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
