import { Heading } from "rebass";

const H2 = ({ ...props }) => (
  <Heading
    as="h2"
    color="white"
    fontSize={["28px", "32px"]}
    fontFamily="body"
    fontWeight={900}
    fontStyle={"italic"}
    sx={{
      textTransform: "uppercase"
    }}
    {...props}
  />
);

export default H2;
