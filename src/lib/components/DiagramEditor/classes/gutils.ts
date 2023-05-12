
const _cx = (dir: any, x: any, coef: any) => {
	return (dir === 'right' || dir === 'left')
		? dir === 'right' ? x + coef : x - coef
		: x;
}

const _cy = (dir: any, y: any, coef: any) => {
	return (dir === 'right' || dir === 'left')
		? y
		: dir === 'bottom' ? y + coef : y - coef;
}

export const _calcDAttr = (coef: any, start: any, end: any) => {
	return `M ${start.position.x} ${start.position.y} C ${_cx(start.dir, start.position.x, coef)} ${_cy(start.dir, start.position.y, coef)}, ` +
		`${_cx(end.dir, end.position.x, coef)} ${_cy(end.dir, end.position.y, coef)}, ${end.position.x} ${end.position.y}`;
}