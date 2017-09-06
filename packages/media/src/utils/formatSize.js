export default function formatSize(bytes) {
	const s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
	const e = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / (1024 ** e)).toFixed(2)} ${s[e]}`;
}
