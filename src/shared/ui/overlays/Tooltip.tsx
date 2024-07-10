import { Children, cloneElement, FC, ReactElement, useState } from "react";
import { Popover } from "react-tiny-popover";

export type TooltipProps = {
  isOpen?: boolean;
  onChangeOpen?: (isOpen: boolean) => void;
  children: ReactElement;
  content: ReactElement;
  maxWidth?: number;
};

export const Tooltip: FC<TooltipProps> = ({
  isOpen: isOpenProp,
  onChangeOpen,
  children,
  content,
  maxWidth,
}) => {
  const isControlled = typeof isOpenProp !== "undefined";
  const [isOpen, setIsOpen] = isControlled
    ? [isOpenProp, onChangeOpen!]
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useState(false);

  return (
    <Popover
      isOpen={isOpen}
      padding={10}
      onClickOutside={() => setIsOpen(false)}
      containerStyle={{ zIndex: "1000" }}
      content={() => (
        // content={({ position, childRect, popoverRect }) => (
        // <ArrowContainer
        //   position={position}
        //   childRect={childRect}
        //   popoverRect={popoverRect}
        // >
        //   <div onClick={() => setIsOpen(!isOpen)}>
        //     Hi! I'm popover content. Here's my position: {position}.
        //   </div>
        // </ArrowContainer>
        <div
          className="z-[100] bg-[#1B1B1E] shadow-border-25 rounded-[8px] py-2 px-2.5 text-[14px] leading-tight"
          style={{
            filter: "drop-shadow(0px 6px 20px #000000A6)",
            maxWidth,
          }}
        >
          {content}
        </div>
      )}
    >
      {cloneElement(Children.only(children), {
        onClick: () => {
          Children.only(children).props.onClick?.();
          if (!isControlled) {
            setIsOpen(!isOpen);
          }
        },
      })}
    </Popover>
  );
};
//
// const ArrowContainer = ({
//   childRect,
//   popoverRect,
//   position,
//   arrowColor = "#1B1B1E",
//   arrowSize = 10,
//   children,
// }: Partial<ArrowContainerProps>) => {
//   const { arrowContainerStyle, arrowStyle: arrowStyleInner } =
//     useArrowContainer({
//       childRect: childRect!,
//       popoverRect: popoverRect!,
//       position,
//       arrowColor,
//       arrowSize: arrowSize,
//     });
//
//   const childRectShift = useMemo(() => {
//     return { ...childRect! };
//   }, [childRect]);
//
//   const { arrowStyle } = useArrowContainer({
//     childRect: childRect!,
//     popoverRect: popoverRect!,
//     position,
//     arrowColor: "rgba(255,255,255,0.25)",
//     arrowSize: arrowSize,
//   });
//
//   return (
//     <div
//       style={{
//         ...arrowContainerStyle,
//         filter: "drop-shadow(0px 6px 20px #000000A6)",
//       }}
//     >
//       <div style={arrowStyle} />
//       <div style={{ ...arrowStyleInner, bottom: 1 }} />
//       <div className="bg-[#1B1B1E] shadow-border-25 rounded-[8px] p-1">
//         {children}
//       </div>
//     </div>
//   );
// };
