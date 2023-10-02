import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export function NotesIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path fill="url(#pattern0)" d="M0 0H20V20H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_75_914" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_75_914"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACjElEQVR4nO1dO25UQRCcBE4BMRL4jkigKTngYxumka9gIWI87RUXIAOOQWDsDNBDIxORot2aeq9K6ryqq3tmn0raKcUwDMMwDMMwDOM/UePyCJEnNfrXGnmLyEW5auTt0HKn6fJo2gF5enFxv0ZviPzNbhr2ZUbLX7Xlm6G1TNf8ljt2g3C4uprKhL+Tv2yr+lmZAeNcHKvJb0getIbm47e7J+z+l9r6KbsZ4G3BK3b/C1r/xm9EcqrlF3b/C6Lf0BsRnKqt/2D3v7CbAHKx+28D2GBPILwB/CZg7UfQ8/bxYW39/bh02IIxWR2k+Wj5nS0UWzVgTD5bJDZugI+dWLEBhYzp+deWH2xA8gx4FrtH+7yECxkS/I9PPz2okReIvLYBOdUAaUzQivnLC4A4f3kBEOcvLwDi/OUFQJy/vACI85cXAHH+8gKgwN95QPIMcB6Q3A1wHpB0A5wHhA1YNrwB+80DIF7yeQDEq6jnARCvwoa6AIjzlxcAcf7yAiDOX14AxPnLC4A4f3kBEOcvLwDi/OUFQIG/84DkGeA8ILkb4Dwg6QY4DwgbsGx4A5wHgGmA84Dk/wx1HpDTfsdofMismL+8AIjzlxcAcf7yAiDOX14AxPnLC4A4f3kBEOcvLwAK/J0HJM8A5wHJ3QDnAUk3wHlA2IBlwxvgPABMA5wHJP9nqPOAnPY7xv+cywb7EsTaL2EbkDYAE0z6tBuw8Q+1a3b//YQJG7Xl6wkmcaFUyxfs/pfxlNNWn7Gq764elxkwnvdjNwSHr5MyC8azfuN5v81Mf/Q8P/98r8yEOxP62bqPo/5zTP50zf/3ThgvzI1Hztbxxli/GVpq9JfTnPmGYRiGYRiGYRRl/AENUgUdjPyxPAAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
}
