import React from 'react';
import IconCoffee from "./img/coffee.png";
import IconCup from "./img/cup.png";
import styled from 'styled-components';

const PreloaderBlock = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-color: #ffffff;
	transition: all .5s ease-in-out;
	animation: finish 1s ease-in-out 1s 1 forwards;

	@keyframes finish {
		0% {
			opacity: 1;
			overflow: visible;
		}
		99% {
			opacity: 0;
			overflow: hidden;
			bottom: 0;
		}
		100% {
			bottom: 100%;
		}
	}

`

const Icon = styled.div`
	position: relative;
	width: 70px;
	height: 70px;
	margin: 0 auto;
	img,
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	div {
		background-color: #ffffff;
		animation: loading 2s infinite;
	}
	@keyframes loading {
		0% {
			height: 100%;
		}
		100% {
			height: 0;
		}
	}

`;

const Preloader = () => (
	<PreloaderBlock>
		<Icon>
			<img src={IconCoffee} alt="Coffee"/>
			<div/>
			<img src={IconCup} alt="Cup"/>
		</Icon>
	</PreloaderBlock>
);

export default Preloader