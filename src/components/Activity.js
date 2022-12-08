const Activity = ({ name, kinds }) => {
  // Splitting string into an array then replacing underscores with space
  const tags = kinds.split(",");
  const tagsFixed = tags.map((tag) => {
    return tag.replaceAll("_", " ");
  });

  return (
    <li>
      <h3>{name}</h3>
      <p className="tags">
        {tagsFixed[0]} - {tagsFixed[1]} - {tagsFixed[2]}
      </p>
    </li>
  );
};

export default Activity;
