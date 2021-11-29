import blitmaps from "../data/blitmaps.json";

const getBlitmapData = id => {
  return blitmaps.find(blit => blit.id == id);
};

export default getBlitmapData;
