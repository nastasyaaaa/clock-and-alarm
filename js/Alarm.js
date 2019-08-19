class Alarm 
{
	constructor(hours, minutes, seconds)
	{
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	equalsTo(date)
	{
		return this.hours == date.getHours() && this.minutes == date.getMinutes() && this.seconds == date.getSeconds();
	}

	goOff() 
	{
		utils.alarmGoOffNotification(`${this.hours}:${this.minutes}:${this.seconds}`);
		
		let audio = new Audio('audio/alarm.mp3');
		audio.play();
	}
}