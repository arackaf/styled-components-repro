import type { AppProps } from "next/app";
import { StyleSheetManager } from "styled-components";
import { stylisPhysicalToLogical } from "@/lib/stylis-plugin/logicalToPhysicalStylisPlugin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager stylisPlugins={[stylisPhysicalToLogical as any]}>
      <Component {...pageProps} />
    </StyleSheetManager>
  );
}
