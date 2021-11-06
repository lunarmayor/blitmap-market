import { Flex, Box } from "@ui";
import useAttributes from "@hooks/useAttributes2";

const FilterBar = ({ id }) => {
  const attributes = useAttributes(id);
  console.log(attributes);

  return <Box />;
};

export default FilterBar;
