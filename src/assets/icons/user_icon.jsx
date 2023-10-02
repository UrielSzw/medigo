import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export function UserIcon(props) {
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
          <Use xlinkHref="#image0_6_1753" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_6_1753"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADHklEQVR4nO3cy0pVURzH8dUgtLCoQWAEBZUSlUI1ym7QM5QW9AIRFc27DwrCSRNLy0eIXqAGBWVIg6CJ1SC7Uemk6Fh6BL+xOquLDcSje+//2mf9PnDgcDy41n/9z76s23ZOREREREREREQkMsBK4ChwCxgGxoBqeI2FzwaAI8AK6/o2DKAdGAQmmD//3dtAm3X9SwtYBvQC0yycPzquAc3W8ZQK0AY8JztDwFrruEoB2BHO6Vl7B3Rax1eGX/5YDo3/bxJareOMEtAMPCN/T/31xTre6FC74BblknW8Md5qTheYgG86Fc1OwCDF67P7ycXXw50wSEBFPWb3KwF+eMFKj0sdtbEdK/0uddQG0awMudQB44YJ+OxSB0wZJmDSpQ4lwDwB44ZHgE5B6CJsfgQMGB4BN13qqM3hWjnsUge0hGGBovkyW6zjjwK1CfSiDVjHHdtMWLXAxvd9j43WcUeF2uqFoly1jjfWKcmhAhr/MdBkHW+UgFbgbY6N/wFYZx1n1IDOsHohaz6xHdbxlQKwBniQ8WlHy1HqTEKTX72wyD6Cv9u5onP+4q8LfXUmwn+3X7ea2feYe/z4DfDEj2SGX/hUeO8/uwF0q4crIiIiIiIiIiIiUY/97we2F1BWB7Av+TkCYBdwDrgPfA/j+B+B9Tk2/gbgUyjLl3kPOAvsdCkAtgEXgRdzTKa8Bjbl1Piv5ih3FLgO7AWWuEYBrAbOAC/rmNF6D3RlWIc94X/O1whwGljlygrYEpYcLnQLajXMCS/4sQLAcuDyIjaBV8Lq7XZXFv6xMGE+Nqud76PAyXqmGf3+X+AU8CajOkyH6c54V1YAS4ELOa50rgB3gOPA7jBZ3xxe/n1X+NvdHDd++zqc97G6mIQL3CPSMQxsdjEIKxW+kp4vwCHrxvd3CjOkawY4YdX43Yk3/m++DY5ZdKgm/1RBfgBbi0yAX+wqsz0sqvEP/lew/HWgUZ9uVRb5b/yrc0wnNSNFJMDi8WJlUSkiATIHJcCYEmBMCTCmBBhTAowpAcaUAGNKgDEloNETICIiIiIiIiIirqx+AqfINHaVA0y6AAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
}
