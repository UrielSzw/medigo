import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function ActivityIcon(props) {
  return (
    <Svg
      width={19}
      height={16}
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.833.5a7.5 7.5 0 00-7.5 7.5h-2.5l3.242 3.242.058.116L7.5 8H5a5.83 5.83 0 015.833-5.833A5.829 5.829 0 0116.667 8a5.829 5.829 0 01-5.834 5.833 5.786 5.786 0 01-4.116-1.716L5.533 13.3a7.462 7.462 0 005.3 2.2 7.5 7.5 0 000-15zM10 4.667v4.166l3.567 2.117.6-1.008-2.917-1.734V4.667H10z"
        fill="#63B4FF"
      />
    </Svg>
  );
}
