import { ElMessage, MessageHandler } from 'element-plus';

let messageInstance:MessageHandler|null = null;
const resetMessage: any = (options:object) => {
	console.log(messageInstance);
	messageInstance && messageInstance.close();
	messageInstance = ElMessage(options);
};

['error', 'success', 'info', 'warning'].forEach(type => {
	resetMessage[type] = (options:any) => {
		if (typeof options === 'string') {
			options = {
				message: options
			};
		}
		options.type = type;
		resetMessage(options);
	};
});
export const message = resetMessage;