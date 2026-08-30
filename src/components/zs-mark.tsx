import type { SVGProps } from "react";

export function ZSMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ZoeySigel 的 ZS 像素标志"
      shapeRendering="crispEdges"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 8h48v12H32v8H20v8H8V8Zm0 36h24v-8h12v-8h12v28H8V44Zm64-36h48v12H84v8h28v12H84v4h36v12H72V28h12v-8H72V8Z"
      />
    </svg>
  );
}
