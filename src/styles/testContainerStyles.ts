import * as Constants from '../constants/gameConstants';

export const gameContainerStyle: React.CSSProperties = {
  width: `${Constants.WIDTH_PERCENTAGE * 100}vw`,
  height: '20vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto'
};

export const lineStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	textAlign: 'center',
	marginBottom: '10px',
	fontSize: '32px'
};

export const timerStyle: React.CSSProperties = {
  fontSize: '24px'
};

export const endTestStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold'
};