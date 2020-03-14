import { data } from './data/data';
import './components/indexPadre';
import MyWorker, { Attribute } from './components/myComponent/myComponent';

//A ver si no se cambia
class AppContainer extends HTMLElement {
	worker: MyWorker[] = [];
	filteredData: MyWorker[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		data.forEach((user) => {
			const workerCard = this.ownerDocument.createElement('my-worker') as MyWorker;
			workerCard.setAttribute(Attribute.image, user.image);
			workerCard.setAttribute(Attribute.name, user.name);
			workerCard.setAttribute(Attribute.uid, String(user.id));
			workerCard.setAttribute(Attribute.age, String(user.age));
			workerCard.setAttribute(Attribute.gender, user.gender);
			workerCard.setAttribute(Attribute.area, String(user.jobDetails.area));
			workerCard.setAttribute(Attribute.position, String(user.jobDetails.position));
			workerCard.setAttribute(Attribute.timeincompany, String(user.jobDetails.timeInCompany));
			workerCard.setAttribute(Attribute.experience, String(user.jobDetails.experience));
			this.worker.push(workerCard);
		});

		this.filterWorkers();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.filteredData.forEach((workers) => {
				this.shadowRoot?.appendChild(workers);
			});
		}
	}

	filterWorkers() {
		this.filteredData = this.worker.filter((worker) => {
			const id = parseInt(worker.getAttribute(Attribute.uid) as string); //parseInt convierte el valor del string a un número entero.
			return id % 2 === 0;
		});
	}
}

customElements.define('app-container', AppContainer);
