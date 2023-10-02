import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function StarIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_75_905)">
        <Path
          d="M12.025 8.333L10 1.667 7.975 8.333H1.667l5.15 3.675-1.959 6.325L10 14.425l5.15 3.908-1.958-6.325 5.141-3.675h-6.308z"
          fill="#FEB052"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_75_905">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
