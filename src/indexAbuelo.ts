import { data } from './data/data';
import './components/indexPadre';
import MyWorker, { Attribute } from './components/myComponent/myComponent';

class AppContainer extends HTMLElement {
	worker: MyWorker[] = [];

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
			workerCard.setAttribute(Attribute.timeInCompany, String(user.jobDetails.experience));
			this.worker.push(workerCard);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.worker.forEach((workers) => {
				this.shadowRoot?.appendChild(workers);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
