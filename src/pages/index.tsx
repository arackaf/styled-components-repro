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
  padding-right: 15px;
  padding-left: 55px;

  [dir="rtl"] & {
    color: green;

    margin-top: 2px;
    margin-left: 50px;
    margin-right: 51px;
  }

  @media (min-width: 200px) {
    span {
      text-decoration: underline;
      border-left: 2px solid purple;
    }
  }
  @media (min-width: 200px) {
    [dir="rtl"] & {
      span {
        line-height: 3;
      }
    }
  }

  @media (min-width: 200px) {
    border: 1px solid red;
  }
  @media (max-width: 200px) {
    border: 1px solid blue;
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
        <div>
          <Junk $active={active}>
            <span>Hello World</span>
          </Junk>
        </div>
      </div>
      <br />
      <br />
      <div>
        <div>
          <Junk $active={active}>
            <span>Hello World</span>
          </Junk>
        </div>
      </div>
    </main>
  ) : null;
}
