import type { FC } from "react";

import EffectDemo from "./_components/effect";
import StateDemo from "./_components/state";

const DemoPage: FC = () => (
  <>
    <StateDemo />
    <EffectDemo />
  </>
);

export default DemoPage;
