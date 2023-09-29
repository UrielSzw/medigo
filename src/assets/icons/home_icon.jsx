import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function HomeIcon(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.77 2.84l-5.39 4.2c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12zM12.75 17.99v-3"
        stroke={props.fill ? props.fill : '#8696BB'}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill={props.fill ? '#63B4FF' : '#FFF'}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
