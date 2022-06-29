import Link from "next/link";
import Image from "next/image";

export default function Diet({ diet }) {
  return (
    <Link href={`/${diet.query}`} key={diet.id}>
      <div className="item">
        <Image
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
    </Link>
  );
}
