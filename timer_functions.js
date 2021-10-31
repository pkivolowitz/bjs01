;

const ElapsedTime = function () {
	if (typeof ElapsedTime.start_time == 'undefined') {
		ElapsedTime.start_time = new Date();
	}
	let end_time = new Date();
	return (end_time - ElapsedTime.start_time) / 1000.0;
}

const InterframeElapsedTime = function () {
	if (typeof InterframeElapsedTime.last_frame_time == 'undefined') {
		InterframeElapsedTime.last_frame_time = ElapsedTime();
	}
	let now = ElapsedTime();
	let delta_time = now - InterframeElapsedTime.last_frame_time;
	InterframeElapsedTime.last_frame_time = now;
	return delta_time;
}
