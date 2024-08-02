import type { ReactNode } from "react";
import { Content, DialogTitle, Overlay, Portal, Root, Trigger } from "./styles";

type DialogProps = {
  children: ReactNode;
  trigger: JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function Dialog({children, trigger, open, onOpenChange}: DialogProps) {
 return (
  <Root open={open} onOpenChange={onOpenChange}>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Overlay/>
      <Content>
        <DialogTitle>{children}</DialogTitle>
      </Content>
    </Portal>
  </Root>
 )
}