import type { SVGProps } from "react";

const PIXEL_SIZE = 8;
const CELL_SIZE = 8;

const Z_PATTERN = ["11111", "00011", "00110", "01100", "11111"] as const;

const S_PATTERN = ["01111", "11000", "01110", "00011", "11110"] as const;

function pixelPath(pattern: readonly string[], offsetX: number) {
  return pattern
    .flatMap((row, rowIndex) =>
      [...row].map((pixel, columnIndex) =>
        pixel === "1"
          ? `M${offsetX + columnIndex * CELL_SIZE} ${12 + rowIndex * CELL_SIZE}h${PIXEL_SIZE}v${PIXEL_SIZE}h-${PIXEL_SIZE}Z`
          : ""
      )
    )
    .join("");
}

const Z_PATH = pixelPath(Z_PATTERN, 20);
const S_PATH = pixelPath(S_PATTERN, 68);

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
      <rect width="128" height="64" fill="#000" />
      <path data-letter="Z" fill="#fff" d={Z_PATH} />
      <path data-letter="S" fill="#fff" d={S_PATH} />
    </svg>
  );
}
