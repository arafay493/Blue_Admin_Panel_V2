declare module "react-loader-spinner" {
  import * as React from "react";

  export interface RotatingLinesProps {
    strokeColor?: string;
    strokeWidth?: number;
    animationDuration?: number;
    width?: number;
    visible?: boolean;
  }

  export class RotatingLines extends React.Component<RotatingLinesProps> {}
  // Add other loader components' types as needed (e.g., Triangle)
}
