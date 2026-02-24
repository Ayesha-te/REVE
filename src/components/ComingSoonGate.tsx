import { type ReactNode } from "react";

type ComingSoonGateProps = {
  children: ReactNode;
};

// ComingSoonGate disabled: render children directly
const ComingSoonGate = ({ children }: ComingSoonGateProps) => {
  return <>{children}</>;
};

export default ComingSoonGate;
