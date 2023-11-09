import * as React from 'react';
import Svg, {Path, Defs, G, ClipPath} from 'react-native-svg';

export function FilterIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_570_830)">
        <Path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="#8696BB" />
      </G>
      <Defs>
        <ClipPath id="clip0_570_830">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
