import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export function CaduceusIcon(props) {
  return (
    <Svg
      width={96}
      height={96}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path fill="url(#pattern0)" d="M0 0H96V96H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_6_1752" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_6_1752"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}
