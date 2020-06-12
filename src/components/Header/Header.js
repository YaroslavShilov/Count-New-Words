import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
	text-align: center;
	h1 {
		margin: 0 0 3px 0;
	}
	p {
		margin: 0;
		padding-top: 3px;
		opacity: .4;
	}
`

const Header = () => (
	<HeaderBlock>
		<h1>Count New Words</h1>
		<p>
			When you meet a new word during reading, watching a video, or something else. You don't know how many times you'll meet this word again, and you can't decide to learn this word or no.
		</p>

		<p>
			You can add this word using this application and every time when you meet this word you count. After reading or something else you get a result of counting. It helps you to decide.
		</p>
		<p>"learn this word or no"</p>
	</HeaderBlock>
);

export default Header