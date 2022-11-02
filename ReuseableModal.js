class ReuseableModal extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    get message() {
        return this.getAttribute("message");
    }

    set message(val) {
        this.setAttribute("message", val);
    }

    get id() {
        return this.getAttribute("id");
    }

    set id(val) {
        this.setAttribute("id", val);
    }

    get btnOne() {
        return this.getAttribute("btnOne");
    }

    set btnOne(val) {
        this.setAttribute("btnOne", val);
    }

    get btnTwo() {
        return this.getAttribute("btnTwo");
    }

    set btnTwo(val) {
        this.setAttribute("btnTwo", val);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
        let modalCloseBtn = this.shadow.querySelector("#modalCloseBtn");
        let modalYesBtn = this.shadow.querySelector("#modalYesBtn");
        let resultForYesClicked = this.shadow.querySelector(".resultForYesClicked")
        modalCloseBtn.addEventListener("click", () => {
          resultForYesClicked.innerHTML = `You just clicked "${this.btnTwo}"`;
          this.closeModal.bind(this);
        });
        modalYesBtn.addEventListener("click", () => {
          resultForYesClicked.innerHTML = `You just clicked "${this.btnOne}"`;
          this.closeModal.bind(this);
        });
    }

    static get observedAttributes() {
        return ["message"];
    }

    closeModal() {
        this.shadow.querySelector(`#${this.id}`).style.display = "none";
    }

    connectedCallback() {
        this.render();
        let modalCloseBtn = this.shadow.querySelector("#modalCloseBtn");
        let modalYesBtn = this.shadow.querySelector("#modalYesBtn");
        let resultForYesClicked = this.shadow.querySelector(".resultForYesClicked")
        modalCloseBtn.addEventListener("click", () => {
          resultForYesClicked.innerHTML = `You just clicked "${this.btnTwo}"`;
          this.closeModal();
        });
        modalYesBtn.addEventListener("click", () => {
          resultForYesClicked.innerHTML = `You just clicked "${this.btnOne}"`;
          this.closeModal();
        });
    }

    render() {
        this.shadow.innerHTML = `
      <style>
        .modal {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
        
        .modal-content {
          text-align: center;
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }
        
        .modalActionBtn {
          display: flex;
          justify-content: space-around;
        }
    
        .commonBtn {
          background-color: #fff;
          height: 30px;
          border-radius: 4px;
          border: 1px solid grey;
          cursor: pointer;
        }
      </style>

      <div id="${this.id}" class="modal">
        <div class="modal-content">
          <p>${this.message}</p>
          <div class="modalActionBtn">
            <button id="modalYesBtn" class="commonBtn">${this.btnOne}</button>
            <button id="modalCloseBtn" class="commonBtn">${this.btnTwo}</button>
          </div>
        </div>
      </div>

      <div class="resultForYesClicked"></div>
    `;
    }
}

customElements.define("reuseable-modal", ReuseableModal);
