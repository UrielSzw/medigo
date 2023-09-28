import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function MapIcon(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M23.583 0l-.213.04-7.12 2.76-8-2.8L.73 2.533a.672.672 0 00-.48.64v20.16A.66.66 0 00.917 24l.213-.04 7.12-2.76 8 2.8 7.52-2.533a.672.672 0 00.48-.64V.667A.66.66 0 0023.583 0zM16.25 21.333l-8-2.813V2.667l8 2.813v15.853z"
        fill={props.fill ? props.fill : '#8696BB'}
      />
    </Svg>
  );
}
