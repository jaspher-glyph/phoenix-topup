import { Box, Container } from "@material-ui/core";

export default function Policy() {
  return (
    <Container>
      <h1>Privacy Policy</h1>
      <Box my={2}>
        {[...new Array(42)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join("\n")}
      </Box>
    </Container>
  );
}
