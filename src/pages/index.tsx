import { useEffect, useRef, useState } from "react";
import styled, { StyleSheetManager, css } from "styled-components";

type Props = {
  $active?: boolean;
};

const red = css`
  &,
  &:hover {
    color: red;
  }
`;

const Junk = styled.div<Props>`
  position: absolute;
  ${() =>
    css`
      left: 100px;
    `}
`;

export default function Home() {
  const [active, setActive] = useState(false);

  const strictModeCrap = useRef(true);
  useEffect(() => {
    //strictModeCrap.current &&
    //setTimeout(() => {
    setActive((val) => (val ? false : true));
    //}, 2000);
    strictModeCrap.current = false;
  }, []);

  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered ? (
    <main dir="rtl" style={{ position: "relative", padding: "20px" }}>
      <Junk>Hello World</Junk>
    </main>
  ) : null;
}
