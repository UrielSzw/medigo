import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function MoneyIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_75_1265)">
        <Path
          d="M9.833 9.083c-1.891-.491-2.5-1-2.5-1.791 0-.909.842-1.542 2.25-1.542 1.484 0 2.034.708 2.084 1.75h1.841c-.058-1.433-.933-2.75-2.675-3.175V2.5h-2.5v1.8c-1.616.35-2.916 1.4-2.916 3.008 0 1.925 1.591 2.884 3.916 3.442 2.084.5 2.5 1.233 2.5 2.008 0 .575-.408 1.492-2.25 1.492-1.716 0-2.391-.767-2.483-1.75H5.267c.1 1.825 1.466 2.85 3.066 3.192V17.5h2.5v-1.792c1.625-.308 2.917-1.25 2.917-2.958 0-2.367-2.025-3.175-3.917-3.667z"
          fill="#63B4FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_75_1265">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
