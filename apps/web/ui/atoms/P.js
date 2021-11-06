import { Text } from "rebass";

const P = ({ ...props }) => (
  <Text as="p" fontWeight={500} fontFamily="body" {...props} />
);

export default P;
