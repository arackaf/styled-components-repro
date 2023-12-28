import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

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
  ${(props) => (props.$active ? red : null)}
`;

const Junk2 = styled.div<Props>`
  font-size: 22px;

  @media (min-width: 200) {
    color: red;
  }
  @media (max-width: 200) {
    color: blue;
  }
`;

export default function Home() {
  const [active, setActive] = useState(false);

  const strictModeCrap = useRef(true);
  useEffect(() => {
    strictModeCrap.current &&
      setInterval(() => {
        setActive((val) => (val ? false : true));
      }, 2000);
    strictModeCrap.current = false;
  }, []);

  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered ? (
    <main>
      <Junk $active={active}>Hello World - should be read {active ? "Yes" : "No"}</Junk>
      <Junk2>Yooo</Junk2>
    </main>
  ) : null;
}
