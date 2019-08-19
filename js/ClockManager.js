class ClockManager {

	constructor() 
	{
		// this.hoursSpan = document.getElementById('hours');
		// this.minutesSpan = document.getElementById('minutes');
		// this.secondsSpan = document.getElementById('seconds');

		this.hoursSpan = $('#hours');
		this.minutesSpan = $('#minutes');
		this.secondsSpan = $('#seconds');

		this.alarms = [];
	}

	initializeClock()
	{
		this.updateClock();
		setInterval(this.updateClock.bind(this), 1000);
		setInterval(this.checkAlarms.bind(this), 1000);
	}	

	updateClock()
	{
		const currentDate = new Date(); 
		// this.hoursSpan.innerText = utils.normalizeNumber(currentDate.getHours());
		// this.minutesSpan.innerText = utils.normalizeNumber(currentDate.getMinutes());
		// this.secondsSpan.innerText = utils.normalizeNumber(currentDate.getSeconds());

		this.hoursSpan.text(utils.normalizeNumber(currentDate.getHours()));
		this.minutesSpan.text(utils.normalizeNumber(currentDate.getMinutes()));
		this.secondsSpan.text(utils.normalizeNumber(currentDate.getSeconds()));
	}

	checkAlarms()
	{
		const currentDate = new Date(); 
		this.alarms.map((alarm) => {

			if(alarm.equalsTo(currentDate)) {
				alarm.goOff();
			}

		});
	}

	setAlarmForTime(hours, minutes, seconds) 
	{
		this.alarms.push(new Alarm(hours, minutes, seconds));
	}

	setAlarmForInterval(intervalInMinutes)
	{
		let currentDate = new Date();
		let futureDate = new Date(currentDate.getTime() + intervalInMinutes * 60 * 1000);
		this.alarms.push(new Alarm(futureDate.getHours(), futureDate.getMinutes(), futureDate.getSeconds()));
	}

}