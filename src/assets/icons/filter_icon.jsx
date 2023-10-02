import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export function FilterIcon(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path fill="url(#pattern0)" d="M0 0H23V23H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_2_1399" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_2_1399"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO3aTWrDMBCGYR8kXZbc00GDt1lIvUMxWReLkBMFml4gxYVCadPG1D+fLL0PaNPVZL5IKtFUFQAAAAAkYOdfHpzvWue7Nwvx+nX1f3M+Hupw3KrrzLb55uP5e+N/LB/Pzf60UdebHee79m7zP3dDiM/qerPjbhw7f6yLut7s2PDmfyx1vdkxAiCAohk7YFxDll7VxIEuXd/k38jUPqAlXh8BBAK4sgMS3sLGEaRvsnEH6Btt/7zkUq+PSzgkHsDSLPcPmDojAAIomrED1vMg43x8FZebH+fjYXgAXauuNzt1OG6HPsrXT92jut4sNfvTpn9w7998bzT/0n/zaT4AACuwY9ZU23xj1lTHMWuq5Zg11TJ+3COAohk7gABGUU8VWGJTDIvvKHVDjAD0TTF2QDmr4giKBMAd8Lupd9Rd6iPBOIL0TbGS74C1MxpGAEUzdgABFM0xa6oOIDJrqlQza6rXMGsKAMgVs5dCzF6KMXspxuylGL82ihGAGAGIEcDMUn/0tsQXAQQCYAeMwREUOYIsgbOcOyDom8klHPQN5b+gsK416gKe45KevaDSEIAYAYgRgBizl2LMXooxe5kAZi8BAAAAoBrsHYcgRgtHP8wyAAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
}
