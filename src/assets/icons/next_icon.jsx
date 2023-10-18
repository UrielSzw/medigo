import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function NextIcon(props) {
  return (
    <Svg
      width={7}
      height={10}
      viewBox="0 0 7 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.158 8.825L3.975 5 .158 1.175 1.333 0l5 5-5 5L.158 8.825z"
        fill={props?.fill ? props.fill : '#63B4FF'}
      />
    </Svg>
  );
}
