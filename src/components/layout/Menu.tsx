import Lock from '../options/lock/LockIcon';
import Settings from '../options/settings/SettingsIcon';

const Menu = () => {
	return (
		<div className="flex-col absolute right-2 top-4 bg-black/30 backdrop-blur-sm p-2 rounded-4xl z-50">
			<Settings />
			<Lock />
		</div>
	);
};

export default Menu;
