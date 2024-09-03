function SingleSwatchCircle({ item, handleClick, activeId }) {
  return (
    <div
      className={`cursor-pointer w-9 h-9 p-1 rounded-full drop-shadow-xl bg-white  transition ease-in hover:scale-110 ${
        item.id === activeId ? "scale-125" : ""
      }`}
      onClick={() => handleClick(item)}
    >
      <div
        style={{ backgroundColor: item.swatchColor }}
        className="w-full h-full  rounded-full"
      ></div>
    </div>
  );
}

export default SingleSwatchCircle;
