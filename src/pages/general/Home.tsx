import { Button } from '@/components/Button';

export function Home() {
	return (
		<>
			<h1>Home</h1>
			<Button onClick={() => console.log('click!')}>Click</Button>
		</>
	);
}
