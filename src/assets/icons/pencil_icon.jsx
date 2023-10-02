import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const PencilIcon = props => {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_56_982)">
        <Path
          d="M2.625 15.094v3.281h3.281l9.678-9.678-3.281-3.28-9.678 9.677zM18.121 6.16a.871.871 0 000-1.234L16.074 2.88a.871.871 0 00-1.234 0L13.239 4.48l3.281 3.281 1.601-1.601z"
          fill="#8696BB"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_56_982">
          <Path fill="#fff" d="M0 0H21V21H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
