import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function PersonalDataIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_33_1192)">
        <Path
          d="M10 1.667A8.336 8.336 0 001.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667zm0 2.5c1.383 0 2.5 1.116 2.5 2.5 0 1.383-1.117 2.5-2.5 2.5a2.497 2.497 0 01-2.5-2.5c0-1.384 1.117-2.5 2.5-2.5zM10 16a6 6 0 01-5-2.683c.025-1.659 3.333-2.567 5-2.567 1.658 0 4.975.908 5 2.567A6 6 0 0110 16z"
          fill="#63B4FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_33_1192">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
