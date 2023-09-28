import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function PinIcon(props) {
  return (
    <Svg
      width={45}
      height={45}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_59_1365)">
        <Path
          d="M22.5 3.75c-7.238 0-13.125 5.887-13.125 13.125C9.375 26.719 22.5 41.25 22.5 41.25s13.125-14.531 13.125-24.375c0-7.238-5.887-13.125-13.125-13.125zm0 3.75a3.761 3.761 0 013.75 3.75A3.749 3.749 0 0122.5 15a3.749 3.749 0 01-3.75-3.75A3.761 3.761 0 0122.5 7.5zm0 18.75a8.968 8.968 0 01-7.5-4.031c.037-2.475 5.006-3.844 7.5-3.844 2.494 0 7.462 1.369 7.5 3.844a8.968 8.968 0 01-7.5 4.031z"
          fill="#63B4FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59_1365">
          <Path fill="#fff" d="M0 0H45V45H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
