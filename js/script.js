const utils = {
	normalizeNumber : (number) => 
	{
		if(+number < 10){
			number = "0" + number;
		}

		return number;
	},

	showSetAlarmNotification : (type) => {
		const options = {
			globalPosition : 'top right',
			className : type,
		};

		if(type === 'error'){
			$.notify('Что-то пошло не так. Будильник не был установлен!', options);
		}else{
			$.notify('Будильник установлен!', options);
		}
	},

	alarmGoOffNotification : (timeString) => {

		$.notify(`Пора вставать!!! Уже ${timeString}`, {
			globalPosition : 'top right',
			className : 'error',
			autoHide : false,
		});

	}
}

const handlers = {

	onAlarmSetterClick : (e) => {
		const target = e.target;

		if(target.dataset.form){
			const forms = [...document.getElementById('forms').children];
			
			forms.forEach((form) => {
				if(form.id === target.dataset.form){
					form.style.display = 'block';
				}else{
					form.style.display = 'none';
				}
			});

		}
	},

	onSaveBtnClick : (e) => {
		e.preventDefault();
		const target = e.target;
		const type = target.closest('form').id;
		const input = target.closest('form').getElementsByTagName('input')[0]; 

		switch (type) {
			case 'time':
				const array = input.value.split(':', 3); 
				clockManager.setAlarmForTime(array[0], array[1], array[2]);
				break;
			case 'interval':
				clockManager.setAlarmForInterval(input.value);
				break;
			default:
				utils.showSetAlarmNotification('error');
				break;
		}

		input.value = '';
		utils.showSetAlarmNotification('success');
	},

}




document.getElementById('alarm-set').addEventListener('click', handlers.onAlarmSetterClick);
[...document.getElementsByClassName('btn-set')].forEach((element) => element.addEventListener('click', handlers.onSaveBtnClick));


const clockManager = new ClockManager();
clockManager.initializeClock();