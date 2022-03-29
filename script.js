const chart = document.getElementById("chart");
const newBtn = document.getElementById("newBtn");
const bubbleSortBtn = document.getElementById("bubbleSort");
const mergeSortBtn = document.getElementById("mergeSort");
const speedSlider = document.getElementById("speedSlider");

let barArray;
const ARRAY_SIZE = 160;
let speed = 100 / speedSlider.value;

speedSlider.oninput = function () {
	speed = 100 / this.value;
};

async function sleep(milliseconds) {
	return new Promise((res) => setTimeout(res, milliseconds));
}

newBtn.addEventListener("click", () => generateChart());

//Generating new chart
function generateChart() {
	while (chart.hasChildNodes()) chart.removeChild(chart.firstChild);
	barArray = [];
	for (let i = 0; i < ARRAY_SIZE; i++)
		barArray.push(Math.floor(Math.random() * 400) + 100);
	drawChart();
}

function drawChart() {
	for (let i = 0; i < ARRAY_SIZE; i++) {
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = `${barArray[i]}px`;
		chart.appendChild(bar);
	}
}

//generates new chart on every reload
generateChart();

//Bubble Sort
bubbleSortBtn.addEventListener("click", () => bubbleSort());

async function bubbleSort() {
	console.log("Inside bubble sort");
	let j;
	const bars = chart.children;
	for (let i = 0; i < ARRAY_SIZE; i++) {
		for (j = 0; j < ARRAY_SIZE - i - 1; j++) {
			const h1 = parseInt(bars[j].style.height);
			const h2 = parseInt(bars[j + 1].style.height);
			await sleep(speed);
			if (h1 > h2) {
				let tmp = bars[j].style.height;
				bars[j].style.height = bars[j + 1].style.height;
				bars[j + 1].style.height = tmp;
				bars[j + 1].style.backgroundColor = "red";
				bars[j].style.backgroundColor = "black";
			} else {
				bars[j + 1].style.backgroundColor = "red";
				bars[j].style.backgroundColor = "black";
			}
		}
		bars[j].style.backgroundColor = "#00fd0a";
	}
}

mergeSortBtn.addEventListener("click", () => mergeSort());

async function mergeSort() {
	const bars = chart.children;

	async function mergeSortRecursion(l, r) {
		if (l >= r) return;
		console.log("inside mergesort");
		let mid = l + parseInt((r - l) / 2);
		await mergeSortRecursion(l, mid);
		await mergeSortRecursion(mid + 1, r);
		await merge(l, mid, r);
	}

	async function merge(l, mid, r) {
		let leftStart = l;
		let leftEnd = mid;
		let rightStart = mid + 1;
		let rightEnd = r;
		let leftN = mid - l + 1;
		let rightN = r - mid;

		let leftArray = [];
		let rightArray = [];

		for (let p = leftStart; p <= leftEnd; p++)
			leftArray.push(parseInt(bars[p].style.height));

		for (let p = rightStart; p <= rightEnd; p++)
			rightArray.push(parseInt(bars[p].style.height));

		let i = 0;
		let j = 0;
		let k = l;

		while (i < leftN && j < rightN) {
			bars[i + leftStart].style.backgroundColor = "red";
			bars[j + rightStart].style.backgroundColor = "red";
			await sleep(speed);
			let h1 = leftArray[i];
			let h2 = rightArray[j];
			if (h1 > h2) {
				await sleep(speed);

				bars[k].style.height = `${h2}px`;
				bars[k].style.backgroundColor = "#00fd0a";
				bars[i + leftStart].style.backgroundColor = "#00fd0a";
				bars[j + rightStart].style.backgroundColor = "#00fd0a";
				k++;
				j++;
			} else {
				await sleep(speed);

				bars[k].style.height = `${h1}px`;
				bars[k].style.backgroundColor = "#00fd0a";
				bars[i + leftStart].style.backgroundColor = "#00fd0a";
				bars[j + rightStart].style.backgroundColor = "#00fd0a";
				k++;
				i++;
			}
			// console.log(bars[k].style.height);
		}

		while (i < leftN) {
			await sleep(speed);
			bars[k].style.backgroundColor = "#00fd0a";
			bars[k++].style.height = `${leftArray[i++]}px`;
		}
		while (j < rightN) {
			await sleep(speed);
			bars[k].style.backgroundColor = "#00fd0a";
			bars[k++].style.height = `${rightArray[j++]}px`;
		}
		parray = [];
		for (let q = l; q <= r; q++) {
			parray.push(parseInt(bars[q].style.height));
		}
		console.log(parray);
	}

	mergeSortRecursion(0, ARRAY_SIZE - 1);
}
