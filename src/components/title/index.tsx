import { forwardRef, type LegacyRef } from 'react';
import { TitleStyles } from './styles';

type TitleProps = {
	title: string;
	subTitle: string;
};
const Title = forwardRef<HTMLTitleElement, TitleProps>(
	({ title, subTitle }, ref) => {
		return (
			<TitleStyles ref={ref as LegacyRef<HTMLDivElement>}>
				<h2>{title}</h2>
				<span>{subTitle}</span>
			</TitleStyles>
		);
	},
);

export default Title;
