import SingleSwatchCircle from "../SingleSwatchCircle/SingleSwatchCircle";

function SwatchWrapper({ activeData, swatchData, handleSwatchClick }) {
  const handleSwatchClicked = (item) => {
    handleSwatchClick(item);
  };
  return (
    <div className="absolute bottom-0 z-20 w-full mb-2 flex justify-center gap-8 h-fit lg:right-[10px] lg:inset-y-[40%] lg:w-fit lg:flex-col">
      {swatchData.map((dataObj) => (
        <SingleSwatchCircle
          key={dataObj.id}
          item={dataObj}
          handleClick={handleSwatchClicked}
          activeId={activeData.id}
        />
      ))}
    </div>
  );
}

export default SwatchWrapper;
