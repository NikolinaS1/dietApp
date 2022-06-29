import allDiet from "../utils/allDiet";
import Diet from "./Diet";

export default function DietsList() {
  return (
    <div className="diet">
      <h2>Choose a diet.</h2>
      <div>
        {allDiet.map((diet) => (
          <Diet diet={diet} />
        ))}
      </div>
    </div>
  );
}
