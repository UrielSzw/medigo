/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {G, Mask, Path, Defs, ClipPath} from 'react-native-svg';

export function DefaultProfile(props) {
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_23_348)">
        <Mask
          id="a"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={56}
          height={56}>
          <Path
            d="M56 28C56 12.536 43.464 0 28 0S0 12.536 0 28s12.536 28 28 28 28-12.536 28-28z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#a)">
          <Path d="M56 0H0v56h56V0z" fill="#FEB052" />
          <Path
            d="M63.268-1.648l-44.466 5.46c-6.14.754-10.506 6.342-9.752 12.481l5.46 44.466c.754 6.14 6.342 10.506 12.481 9.752l44.466-5.46c6.14-.754 10.506-6.342 9.752-12.481L75.75 8.104c-.753-6.14-6.342-10.506-12.481-9.752z"
            fill="#4894FE"
          />
          <Path
            d="M29.028 31.349c3.189 1.39 6.296 1.228 9.321-.489"
            stroke="#fff"
            strokeWidth={2.22222}
            strokeLinecap="round"
          />
          <Path
            d="M24.656 22.232c-.044-.858-.603-1.526-1.246-1.492-.643.033-1.129.756-1.084 1.614.045.858.603 1.526 1.247 1.492.643-.033 1.128-.756 1.083-1.614zM43.297 21.255c-.044-.858-.602-1.526-1.246-1.492-.643.033-1.129.756-1.084 1.614.045.858.603 1.526 1.247 1.492.643-.033 1.129-.756 1.084-1.614z"
            fill="#fff"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_23_348">
          <Path fill="#fff" d="M0 0H56V56H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
