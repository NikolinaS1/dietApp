import { v4 as uuid } from "uuid";
import glutenFree from "../asets/img/glutenFree.jpg";
import keto from "../asets/img/keto.jpg";
import lactoVege from "../asets/img/lactoVege.jpg";
import vegan from "../asets/img/vegan.jpg";
import lowFodmap from "../asets/img/lowFodmap.jpg";
import ovoVege from "../asets/img/ovoVege.jpg";
import paleo from "../asets/img/paleo.jpg";
import pescetarian from "../asets/img/pescetarian.jpg";
import primal from "../asets/img/primal.jpg";
import vegetarian from "../asets/img/vegetarian1.jpg";
import whole30 from "../asets/img/whole30.jpg";

export default [
  {
    id: uuid(),
    name: "Gluten Free",
    description:
      "Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).",
    query: "glutenFree",
    image: glutenFree,
  },
  {
    id: uuid(),
    name: "Ketogenic",
    description:
      "The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.",
    query: "ketogenic",
    image: keto,
  },
  {
    id: uuid(),
    name: "Vegetarian",
    description:
      "No ingredients may contain meat or meat by-products, such as bones or gelatin.",
    query: "vegetarian",
    image: vegetarian,
  },
  {
    id: uuid(),
    name: "Lacto-Vegetarian",
    description:
      "All ingredients must be vegetarian and none of the ingredients can be or contain egg.",
    query: "lactoVegetarian",
    image: lactoVege,
  },
  {
    id: uuid(),
    name: "Ovo-Vegetarian",
    description:
      "All ingredients must be vegetarian and none of the ingredients can be or contain dairy.",
    query: "ovoVegetarian",
    image: ovoVege,
  },
  {
    id: uuid(),
    name: "Vegan",
    description:
      "No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.",
    query: "vegan",
    image: vegan,
  },
  {
    id: uuid(),
    name: "Pescetarian",
    description:
      "Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.",
    query: "pescetarian",
    image: pescetarian,
  },
  {
    id: uuid(),
    name: "Paleo",
    description:
      "Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.",
    query: "paleo",
    image: paleo,
  },
  {
    id: uuid(),
    name: "Primal",
    description:
      "Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.",
    query: "primal",
    image: primal,
  },
  {
    id: uuid(),
    name: "Low FODMAP",
    description:
      'FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)',
    query: "lowFodmap",
    image: lowFodmap,
  },
  {
    id: uuid(),
    name: "Whole30",
    description: `Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.

`,
    query: "whole30",
    image: whole30,
  },
];
