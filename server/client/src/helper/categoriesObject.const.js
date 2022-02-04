import * as fontAwesomeSolidIcons from "@fortawesome/free-solid-svg-icons";

const categoryStyleSheet = {
  food: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faAppleAlt,
    color: "#EB6383",
    border: "#CB4363",
    textColor: "#FFFFFF",
  },
  kids: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faBaby,
    color: "#FA9191",
    border: "#DA7171",
    textColor: "#FFFFFF",
  },
  3: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faBabyCarriage,
    color: "#FFE9C5",
    border: "#DFC9A5",
    textColor: "#000000",
  },
  4: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faBook,
    color: "#B4F2E1",
    border: "#94D2C1",
    textColor: "#000000",
  },
  5: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faCarrot,
    color: "#E7B2A5",
    border: "#C79285",
    textColor: "#000000",
  },
  gas: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faCar,
    color: "#F1935C",
    border: "#D1733C",
    textColor: "#222222",
  },
  7: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faCat,
    color: "#BA6B57",
    border: "#9A4B37",
    textColor: "#222222",
  },
  8: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faCocktail,
    color: "#30475E",
    border: "#10273E",
    textColor: "#222222",
  },
  9: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faFutbol,
    color: "#EEF9BF",
    border: "#CED99F",
    textColor: "#222222",
  },
  10: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faHeadSideMask,
    color: "#A7E9AF",
    border: "#87C98F",
    textColor: "#222222",
  },
  11: {
    category: "FOOD",
    icon: fontAwesomeSolidIcons.faHeadphones,
    color: "#75B79E",
    border: "#55977E",
    textColor: "#FFFFFF",
  },
  12: {
    category: "GAS",
    icon: fontAwesomeSolidIcons.faHeart,
    color: "#6A8CAF",
    border: "#4A6C8F",
    textColor: "#FFFFFF",
  },
  13: {
    category: "SHOPPING",
    icon: fontAwesomeSolidIcons.faHome,
    color: "#85603F",
    border: "#65401F",
    textColor: "#000000",
  },
  14: {
    category: "HEALTH",
    icon: fontAwesomeSolidIcons.faIceCream,
    color: "#9E7540",
    border: "#7E5520",
    textColor: "#000000",
  },
  15: {
    category: "ICECREAM",
    icon: fontAwesomeSolidIcons.faLemon,
    color: "#BD9354",
    border: "#9D7334",
    textColor: "#000000",
  },
  16: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faKitMedical,
    color: "#E3D18A",
    border: "#C3B16A",
    textColor: "#222222",
  },
  17: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faPaw,
    color: "#F39189",
    border: "#D37169",
    textColor: "#222222",
  },
  18: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faFootball,
    color: "#BB8082",
    border: "#9B6062",
    textColor: "#222222",
  },
  19: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faCartShopping,
    color: "#6E7582",
    border: "#4E5562",
    textColor: "#222222",
  },
  20: {
    category: "UNKNOWN",
    icon: fontAwesomeSolidIcons.faTelevision,
    color: "#046582",
    border: "#025572",
    textColor: "#222222",
  }
};

export const categoryColors = [
  {color:"#EB6383", borderColor:"#CB4363"},
  {color:"#FFE9C5", borderColor:"#DFC9A5"},
  {color:"#FA9191", borderColor:"#DA7171"},
  {color:"#B4F2E1", borderColor:"#94D2B1"},
  {color:"#E7B2A5", borderColor:"#C79285"},
  {color:"#F1935C", borderColor:"#D1734C"},
  {color:"#BA6B57", borderColor:"#9A4B47"},
  {color:"#30475E", borderColor:"#20374E"},
  {color:"#EEF9BF", borderColor:"#BED99F"},
  {color:"#A7E9AF", borderColor:"#87C98F"},
  {color:"#75B79E", borderColor:"#55977E"},
  {color:"#6A8CAF", borderColor:"#5A6C8F"},
  {color:"#85603F", borderColor:"#65502F"},
  {color:"#9E7540", borderColor:"#7E5530"},
  {color:"#BD9354", borderColor:"#9D7344"},
  {color:"#E3D18A", borderColor:"#C3B16A"},
  {color:"#F39189", borderColor:"#D37169"},
  {color:"#BB8082", borderColor:"#9B6062"},
  {color:"#6E7582", borderColor:"#5E5562"},
  {color:"#046582", borderColor:"#005562"},
];

export const categoryIcons = [
  fontAwesomeSolidIcons.faAppleAlt,
  fontAwesomeSolidIcons.faBaby,
  fontAwesomeSolidIcons.faBabyCarriage,
  fontAwesomeSolidIcons.faBook,
  fontAwesomeSolidIcons.faCarrot,
  fontAwesomeSolidIcons.faCar,
  fontAwesomeSolidIcons.faCat,
  fontAwesomeSolidIcons.faCocktail,
  fontAwesomeSolidIcons.faFutbol,
  fontAwesomeSolidIcons.faHeadSideMask,
  fontAwesomeSolidIcons.faHeadphones,
  fontAwesomeSolidIcons.faHeart,
  fontAwesomeSolidIcons.faHome,
  fontAwesomeSolidIcons.faIceCream,
  fontAwesomeSolidIcons.faLemon,
  fontAwesomeSolidIcons.faKitMedical,
  fontAwesomeSolidIcons.faPaw,
  fontAwesomeSolidIcons.faFootball,
  fontAwesomeSolidIcons.faCartShopping,
  fontAwesomeSolidIcons.faTelevision,
];

export default categoryStyleSheet;
