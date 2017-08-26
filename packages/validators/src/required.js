export default function required(message = 'This field is required') {
	return value => {
		if (typeof value !== 'string') throw new Error('Given value is not a string');
		if (value.replace(/\s+/, '') === '') throw new Error(message);
		return value;
	};
}
