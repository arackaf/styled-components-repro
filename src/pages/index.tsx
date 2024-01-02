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
  font-size: 20px;
  margin-left: 5px;
  padding-right: 5px;
  margin-top: 15px;
`;

const Junk2 = styled.div<Props>`
  font-size: 22px;

  @media (min-width: 200px) {
    color: pink;
  }
  @media (max-width: 200px) {
    color: blue;
  }
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
    <main>
      <div dir="rtl">
        <Junk dir="rtl" $active={active}>
          Hello World
        </Junk>
      </div>
    </main>
  ) : null;
}
