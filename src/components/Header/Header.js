import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
	text-align: center;
	h1 {
		margin: 0;
	}
	p {
		margin: 0;
		padding-top: 5px;
		opacity: .4;
	}
`

const Header = () => (
	<HeaderBlock>
		<h1>Count New Words</h1>
		<p>add new words, count how many times do you meet these words during reading and decide, learn this word or no</p>
	</HeaderBlock>
);

export default Header