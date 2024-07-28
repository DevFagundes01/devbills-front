import { TitleStyles } from "./styles";

type TitleProps = {
  title: string
  subTitle: string
}
export function Title({title, subTitle}: TitleProps) {
 return (
  <TitleStyles>
    <h2>{title}</h2>
    <span>{subTitle}</span>
  </TitleStyles>
 )
}