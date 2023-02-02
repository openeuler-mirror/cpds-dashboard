import type { App } from 'vue'
import { authDirective } from '/@/utils/authDirective'

// Export instruction method
export function directive(app: App) {
  authDirective(app)
}
