import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function HelpIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 .667A8.336 8.336 0 00.667 9c0 4.6 3.733 8.333 8.333 8.333S17.333 13.6 17.333 9 13.6.667 9 .667zm.833 14.166H8.167v-1.666h1.666v1.666zm1.725-6.458l-.75.767c-.6.608-.975 1.108-.975 2.358H8.167v-.417c0-.916.375-1.75.975-2.358l1.033-1.05c.308-.3.492-.717.492-1.175 0-.917-.75-1.667-1.667-1.667s-1.667.75-1.667 1.667H5.667a3.332 3.332 0 116.666 0c0 .733-.3 1.4-.775 1.875z"
        fill="#63B4FF"
      />
    </Svg>
  );
}
