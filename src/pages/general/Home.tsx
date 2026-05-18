import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';

export function Home() {
	return (
		<div className="flex flex-col lg:flex-row min-h-screen w-full items-center justify-center gap-10">
			<h1>Home</h1>
			<Button onClick={() => console.log('click!')}>Click</Button>
			<p>This is a Text to select.</p>
			<Link to="/" className="hover:underline">
				That's a link to the homepage.
			</Link>
		</div>
	);
}
