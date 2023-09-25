import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function ClockIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_59_1406)" fill={props.fill ? props.fill : '#fff'}>
        <Path d="M7.993 1.333A6.663 6.663 0 001.333 8c0 3.68 2.98 6.667 6.66 6.667A6.67 6.67 0 0014.667 8a6.67 6.67 0 00-6.674-6.667zm.007 12A5.332 5.332 0 012.667 8 5.332 5.332 0 018 2.667 5.332 5.332 0 0113.333 8 5.332 5.332 0 018 13.333z" />
        <Path d="M8.333 4.667h-1v4l3.5 2.1.5-.82-3-1.78v-3.5z" />
      </G>
      <Defs>
        <ClipPath id="clip0_59_1406">
          <Path fill={props.fill ? props.fill : '#fff'} d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
