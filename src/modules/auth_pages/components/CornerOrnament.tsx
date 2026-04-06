import { CSSProperties } from "react";
import { CornerOrnamentProps } from "../definitions";

function CornerOrnament({ top, bottom, left, right }: CornerOrnamentProps) {
  const style: CSSProperties = {
    position:    "absolute",
    top, bottom, left, right,
    width:       24,
    height:      24,
    borderTop:    top    !== undefined ? "2px solid rgba(255,255,255,0.25)" : "none",
    borderBottom: bottom !== undefined ? "2px solid rgba(255,255,255,0.25)" : "none",
    borderLeft:   left   !== undefined ? "2px solid rgba(255,255,255,0.25)" : "none",
    borderRight:  right  !== undefined ? "2px solid rgba(255,255,255,0.25)" : "none",
  };
  return <div style={style} />;
}

export default CornerOrnament;