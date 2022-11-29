import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { getGroupedEvents } from './googleCalendareService.js'

import CalendarFeed from './panels/CalendarFeed';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [fetchedEvents, setEvents] = useState(null);
	const [width, setWindowWidth] = useState(0);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const events = await getGroupedEvents();
			setEvents({days :events});
		}
		fetchData();

		updateDimensions();

		window.addEventListener("resize", updateDimensions);
		return () => 
		window.removeEventListener("resize",updateDimensions);
	}, []);

	const updateDimensions = () => {
		const width = window.innerWidth
		setWindowWidth(width)
	  }

	  const displayDesktop= {
		display: width > 768 ? 'block' : 'none'
	  }
	  const displayMobile = {
		display: width > 768 ? 'none' : 'block',
	  }

	const preventDefault = (ev) => {
		if (ev.preventDefault) {
		  ev.preventDefault();
		}
		ev.returnValue = false;
	  };
	  
	const enableBodyScroll = () => {
	document && document.removeEventListener("wheel", preventDefault, false);
	};

	const disableBodyScroll = () => {
	document &&
		document.addEventListener("wheel", preventDefault, {
		passive: false
		});
	};
	
	function usePreventBodyScroll() {
		const [hidden, setHidden] = useState(false);
		
		useEffect(() => {
			hidden ? disableBodyScroll() : enableBodyScroll();
		
			return enableBodyScroll;
		}, [hidden]);
		
		const disableScroll = useCallback(() => setHidden(true), []);
		const enableScroll = useCallback(() => setHidden(false), []);
		return { disableScroll, enableScroll };
	}

	const { disableScroll, enableScroll } = usePreventBodyScroll();

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>		
					<CalendarFeed id='calendarFeed' calendar={fetchedEvents} disableScroll={disableScroll} enableScroll={enableScroll} displayDesktop={displayDesktop} displayMobile={displayMobile}/>							
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
