import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './DotGridBackground.module.css';

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)';
const finePointerQuery = '(pointer: fine)';

export function DotGridBackground() {
	const backgroundRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = backgroundRef.current;
		if (!element) return;

		const prefersReducedMotion = window.matchMedia(
			prefersReducedMotionQuery,
		).matches;
		const hasFinePointer = window.matchMedia(finePointerQuery).matches;

		if (prefersReducedMotion || !hasFinePointer) return;

		/* sets default position to center */
		element.style.setProperty('--cursor-x', `${window.innerWidth / 2}`);
		element.style.setProperty('--cursor-y', `${window.innerHeight / 2}`);

		const xTo = gsap.quickTo(element, '--cursor-x', {
			duration: 0.3,
			ease: 'power3.out',
		});

		const yTo = gsap.quickTo(element, '--cursor-y', {
			duration: 0.3,
			ease: 'power3.out',
		});

		const handlePointerMove = (event: PointerEvent) => {
			xTo(event.clientX);
			yTo(event.clientY);
		};

		window.addEventListener('pointermove', handlePointerMove, {
			passive: true,
		});

		/* cleanup to avoid stacking of event listener from effect */
		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, []);

	return (
		<div
			ref={backgroundRef}
			className={styles.dotGridBackground}
			aria-hidden="true"
			role="presentation"
		/>
	);
}
