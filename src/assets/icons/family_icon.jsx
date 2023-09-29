import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export function FamilyIcon(props) {
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
          <Use xlinkHref="#image0_56_996" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_56_996"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFbElEQVR4nO2bW2gdZRDHN/ogioI+CGqtt+qDL97qg3hB6oOiaL3UegObnPnWgNVWQR8EL/GGD+qD+iAWRaoolCikOTN7IkhVUFqEUnyQJl6oTypVW0niLVr7lznZkiapOXv27LffnnR+MHDY5Jydb+ab+eb7ZjeKDMMwDMMwDMMwDMMwDMMwDMMwigboiQXLSfA0CT52jDHH+E2FBKN6jRhP9dVxkRm/YMPXBLcR4ysnQCZhjMWMW/W75owO6G9gGQk+z2x4mS3E2BYP40xzQg5qdVxOjN15je9m5Jc4wVXmhDYgwQpi/F2A8ZHKVK2OK80JGdCU4Rg/FWh8HIgEN4yzzQkLAfR0kvNda9lqC/MCuDpu92h8NBfmBKssCv5v9rdTakpOBwhGzQGHWngTXOzb+O6AExq40JwwN/0wninLAY7xpDlgbgTo8UJZEcDYYg6Y64AS8r+biYCxThzQX8dpJFhHgg8OPpPSz+m1+/uGsLSrnEyCydIiQDCZR8c1jCUk2OAE+zLc418nGOwdwRlRN+AEE6VFgGCiXf2ojptyTpIJYqyMqk6VUxAxHkhndN6I0++uj6qMY3xUxUWYpmd+buMf7IRKR4I2U0pzgGAgi05xA6cWvDZN0GacElUR7WSV5YAa4/wsOpHgTQ/R93pUSYCeZknnP/3szFpqZql2csg+jayoimgbsYTZf3MWXXTR9KVDnOC+qMIHcts8zv7Psh5HE2PEmx6CJKoqunHx1ZDpb2BZVj1I8E1Vd+Le0fahthELHPRUzLiiQhvDtjeCpeMSXFZUU54EKyp1NMIYj7qmPyzY2knO7815FuN1Z171FDRvYU6wSjtZbRh+pxPc0sltD9tFeCG0k6XNFGJsSR9HnExlNL02EAsuKOJeeqTs0QFri9BxUdM3hKU+NmLE+KeyG7Gq4RhveHDAa6HH1TWsYSwptBxljPeP4OTQ4+oqagmuLSIVNY+067gh9Hi6EidY32lDRnvIocfR1RBjZa50xBiPE1wfWv9FQa2BE4nxslYymVIO423L+R7QMlKPlB2jMW8/Iki0zu/+UlMbNIJznWC1EzyiJWHzPTDBlyTYRYK9+g5Bml/18+50B/whCTaS4DHt59YEZ9kT0RlYPYgj7xFcqrvZ9Bjg1wJr7z1OMEyCu/3PnC5iXQNH6ZmNE7xFgp+L3vS4Gfmj6djNOC70mKvz/pdgg6YOj0ZHKp/YmzHTKeZolyB2gi9KMDrSSuRVTW1FTBo91o4FdxLjWRJsIsH2WWvR9Hq0N72mf9uk/9v8juD0KBT9dRzjGA8V1Fxpx/jPdaJ37xCOJ8YdxHiXGD8UsA7pb7yjbwHpb0dlzPga40HH+LFMw7tp42/MU/kMDOCImHGNY7xf8Fuac2WKBO9RHVfrPQs3vmNc5wTfl214p8IYU+e3o68+reYYjzvGdwEmyy4neLSwDZsTPOEY+wMZf7+Wsll11UE7xivE+CuIvrN1/9MJXuoVnJTf+AnuCjkIEtSz6KnlKAle1PI0uOHnj+F3x3hh7SCObcv49wpOKPMlC3cIiRu4pJWe+lxoqY/C5xV9THMY52V2AAkeDjpzGN+2Wni1HPS84St6THuaRylZcIJPA8+Y5xfST6sNx9gR2qhtO0GwPVOlVESt7PMN+FhwY2hj5pVM/YRglY9MSx/jnAX1EwyHNmQHMtTaAYGV7G2xu9Q1IrSOHcjXlXfAQIs86Xln61VU98o7IKq4fr7HF3yAUcX1MwdIeCNaBEh4Q/qK8OAhHlVcP3OAhDeiRYCEN6SvCA8e4lHF9TMHSHgjWgRIeEP6ivDgIR4d7g4wDMMwDMMwDMMwDMMwDMMwDCNabPwHMShWwJF409sAAAAASUVORK5CYII="
        />
      </Defs>
    </Svg>
  );
}
