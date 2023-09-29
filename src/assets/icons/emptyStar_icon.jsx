import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function EmptyStarIcon(props) {
  return (
    <Svg
      width={54}
      height={54}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M49.5 20.79l-16.178-1.395L27 4.5l-6.323 14.918L4.5 20.79l12.285 10.643-3.69 15.817L27 38.858l13.905 8.392-3.668-15.817L49.5 20.79zM27 34.65l-8.46 5.108 2.25-9.63-7.47-6.48 9.855-.855L27 13.725l3.848 9.09 9.855.855-7.47 6.48 2.25 9.63L27 34.65z"
        fill="#FEB052"
      />
    </Svg>
  );
}
