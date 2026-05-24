import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';
import { createPortal } from 'react-dom';

export function Cursor() {
	const cursorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const interactiveSelector =
			'a, button, input, textarea, select, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
		const textSelector =
			'p, span, h1, h2, h3, h4, h5, h6, li, label, small, strong, em, blockquote, code';
		const handlePointerMove = (event: PointerEvent) => {
			cursorRef.current?.style.setProperty('--cursor-x', `${event.clientX}px`);
			cursorRef.current?.style.setProperty('--cursor-y', `${event.clientY}px`);

			const target = event.target;

			if (!(target instanceof Element)) {
				cursorRef.current?.classList.remove(styles.interactive, styles.text);
				return;
			}

			const isInteractive = Boolean(target.closest(interactiveSelector));
			const isText = Boolean(target.closest(textSelector));

			cursorRef.current?.classList.toggle(styles.interactive, isInteractive);
			cursorRef.current?.classList.toggle(
				styles.text,
				isText && !isInteractive,
			);
		};

		window.addEventListener('pointermove', handlePointerMove, {
			passive: true,
		});

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, []);

	return createPortal(
		<div ref={cursorRef} className={styles.customCursor} aria-hidden="true">
			<div className={styles.cursorDot} />
		</div>,
		document.body,
	);
}
