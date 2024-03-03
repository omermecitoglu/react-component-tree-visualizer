const blue = "rgba(68, 76, 247, 0.1)";
const gray = "rgba(229, 229, 247, 0.1)";

const imageDefinition = [
  `linear-gradient(${blue} 2px, transparent 2px)`,
  `linear-gradient(90deg, ${blue} 2px, transparent 2px)`,
  `linear-gradient(${blue} 1px, transparent 1px)`,
  `linear-gradient(90deg, ${blue} 1px, ${gray} 1px)`,
];

const pattern: React.CSSProperties = {
  backgroundColor: gray,
  backgroundImage: imageDefinition.join(", "),
  backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
  backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
};

export default pattern;
