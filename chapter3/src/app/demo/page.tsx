import type { FC } from "react";

import EffectDemo from "./_components/effect";
import ForwardRefDemo from "./_components/forwardRef";
import MemoDemo from "./_components/memo";
import RefDemo from "./_components/ref";
import StateDemo from "./_components/state";

const DemoPage: FC = () => (
  <>
    <StateDemo />
    <EffectDemo />
    <RefDemo />
    <ForwardRefDemo />
    <MemoDemo />
  </>
);

export default DemoPage;
