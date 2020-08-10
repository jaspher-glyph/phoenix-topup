import Head from "next/head";

export default function Header({ title = "Phoenix Top Up" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan|Roboto:300,400,500&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
