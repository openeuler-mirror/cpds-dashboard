import type { App } from 'vue';
import { authDirective } from '/@/utils/authDirective';
import { wavesDirective, dragDirective, scrollBarDirective } from '/@/utils/customDirective';

// Export instruction method
export function directive(app: App) {
	authDirective(app);
	wavesDirective(app);
	dragDirective(app);
	scrollBarDirective(app);
}
