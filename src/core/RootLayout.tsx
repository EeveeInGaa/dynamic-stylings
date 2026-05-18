import { Outlet, useMatches, type UIMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { DotGridBackground } from '@/core/DotGridBackground/DotGridBackground.tsx';
import { Cursor } from '@/core/Cursor/Cursor.tsx';

type RouteHandle = {
	title?: string;
};

export function RootLayout() {
	const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

	useEffect(() => {
		const match = [...matches].reverse().find((match) => match.handle?.title);
		const title = match?.handle?.title;

		document.title = title ?? 'My App';
	}, [matches]);

	return (
		<div className="relative isolate min-h-screen">
			<Cursor />
			<DotGridBackground />
			<div className="relative z-10 flex min-h-screen flex-col">
				<main className="grow custom-container mt-lg">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
