export enum Attribute {
	'image' = 'image',
	'name' = 'name',
	'uid' = 'uid',
	'age' = 'age',
	'gender' = 'gender',
	'area' = 'area',
	'position' = 'position',
	'timeincompany' = 'timeincompany',
	'experience' = 'experience',
}

class Worker extends HTMLElement {
	image?: string;
	name?: string;
	uid?: number;
	age?: number;
	gender?: string;
	area?: string;
	position?: string;
	timeincompany?: number;
	experience?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			name: null,
			uid: null,
			age: null,
			gender: null,
			area: null,
			position: null,
			timeincompany: null,
			experience: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.age:
				this.age = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.timeincompany:
				this.timeincompany = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.experience:
				this.experience = newValue ? Number(newValue) : undefined;
				break;

			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/myComponent/myComponent.css">
      <section>
      <img src=${this.image}></img>
      <h1>${this.name}</h1>
      <p><b>ID:</b> ${this.uid}</p>
      <p><b>Edad:</b> ${this.age} años</p>
      <p><b>Género:</b> ${this.gender}</p>
      <p><b>Área: </b>${this.area}</p>
      <p><b>Posición:</b> ${this.position}</p>
      <p><b>Tiempo en la compañía:</b> ${this.timeincompany}</p>
      <p><b>Experiencia: </b>${this.experience}</p>
      </section>
      `;
		}
	}
}

export default Worker;
customElements.define('my-worker', Worker);
