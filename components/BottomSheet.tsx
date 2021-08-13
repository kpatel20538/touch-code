import { ReactNode, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import classNames from "classnames";
import styles from "../styles/BottomSheet.module.css";

type Props = {
  isActive: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

const HEIGHT = 300;
const ACTIVE = -HEIGHT;
const THRESHOLD = 0.75 * ACTIVE;
const INACTIVE = 0;

export default function BottomSheet({ isActive, onClose, children }: Props) {
  const [{ y }, api] = useSpring(() => ({ y: isActive ? ACTIVE : INACTIVE }));

  useEffect(() => {
    api.start({ y: isActive ? ACTIVE : INACTIVE });
  }, [api, isActive]);

  const bind = useDrag(
    ({ last, offset: [_, oy] }) => {
      if (last && oy > THRESHOLD) {
        api.start({ y: INACTIVE });
        onClose?.();
      } else if (last) {
        api.start({ y: ACTIVE });
      } else {
        api.start({ y: oy });
      }
    },
    {
      from: () => [0, y.get()],
      bounds: { top: ACTIVE, bottom: INACTIVE },
    }
  );

  return (
    <div className={classNames("fixed left-0 right-0", styles["t-screen"])}>
      <animated.div
        className={classNames(
          "shadow h-full w-full flex flex-col rounded-t-lg border-t bg-white border-gray-300",
          styles["h-bottomsheet"]
        )}
        style={{ y }}
      >
        <div
          {...bind()}
          className={classNames(
            "p-2 self-center select-none",
            styles["touch-action-none"]
          )}
        >
          <div className="h-2 w-32 bg-gray-300 rounded-full"></div>
        </div>
        <div className="overflow-y-scroll">{children}</div>
      </animated.div>
    </div>
  );
}
