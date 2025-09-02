import { use, useCallback } from 'react';
import { SettingsContext } from '../../../App';
import { getLanguageSettings, setAnimationSettings } from './settingsUtils';

/* Settings to enable or disable animated GIF icons on the page. */
const SettingsAnimation = () => {
	const { animationOn, setAnimationOn } = use(SettingsContext);

	/* Set the animation to be on or off on click of the switch. */
	const handleAnimationChange = useCallback((): void => {
		setAnimationOn(prevAnimationOn => !prevAnimationOn);
	}, [setAnimationSettings(animationOn)]);

	return (
		<div className="flex justify-between">
			<h1 className="my-4 px-7 text-2xl">
				{getLanguageSettings() === 'cs' ? 'Animace' : 'Animation'}
			</h1>
			<div className="flex px-6">
				<label className="inline-flex items-center cursor-pointer">
					<span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
						{animationOn
							? getLanguageSettings() === 'cs'
								? 'Zapnuto'
								: 'On'
							: getLanguageSettings() === 'cs'
							? 'Vypnuto'
							: 'Off'}
					</span>
					<input
						checked={animationOn}
						className="sr-only peer"
						onChange={() => handleAnimationChange()}
						type="checkbox"
					/>
					<div className="relative w-14 h-7 mr-2 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
				</label>
			</div>
		</div>
	);
};

export default SettingsAnimation;
