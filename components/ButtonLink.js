import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";

const Linkedin = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>{children}</a>
  </Link>
);

export default function ButtonLink({ color, title, href }) {
  return (
    <Button color={color} component={Linkedin} href={href}>
      {title}
    </Button>
  );
}
