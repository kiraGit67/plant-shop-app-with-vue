"use strict";

Vue.createApp({
  data() {
    return {
      h2text: "Pflanzen-Artikel",
      message: "im Überblick",
      asideText: "Warenkorb",
      plants: [],
      //filteredPlants: [],
      filterMaxPrice: 20.0,
    };
  },
  computed: {
    filteredPlants() {
      return this.plants.filter((plant) => plant.price <= this.filterMaxPrice);
    },
    maxPrice() {
      const prices = this.plants.map((plant) => plant.price);
      const maxPrice = 100;
      return Math.max(...prices);
    },
    minPrice() {
      const prices = this.plants.map((plant) => plant.price);
      return Math.min(...prices);
    },
  },
  async created() {
    await this.getPlants();
    //this.filteredPlants = this.plants;
  },
  methods: {
    async getPlants() {
      const response = await fetch("http://localhost:3000/plants");
      this.plants = await response.json();
      console.log(this.plants);
    },
    async addNewPlant() {
      const imgInput = document.querySelector('input[name="img-source"]');
      const titleInput = document.querySelector('input[name="title"]');
      const subtitleInput = document.querySelector('input[name="subtitle"]');
      const descriptionInput = document.querySelector(
        'input[name="description"]'
      );
      const priceInput = document.querySelector('input[name="price"]');

      console.log(
        imgInput.value,
        titleInput.value,
        subtitleInput.value,
        descriptionInput.value,
        parseFloat(priceInput.value)
      );

      const newPlant = {
        imgSource: imgInput.value,
        title: titleInput.value,
        subtitle: subtitleInput.value,
        description: descriptionInput.value,
        price: parseFloat(priceInput.value),
      };

      console.log(newPlant);

      const response = await fetch("http://localhost:3000/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });

      const newProduct = await response.json();
      console.log(newProduct);

      this.plants.push(newProduct);
    },
    changeMessage() {
      this.message = "für jeden Wohnraum";
    },
    onFilterPrice(event) {
      console.log(event.target.value);
      this.filterMaxPrice = event.target.value;
      /*
      this.filteredPlants = this.plants.filter(
        (plant) => plant.price <= this.filterMaxPrice
      );
      */
      this.message = "bis " + this.filterMaxPrice + " €";
    },
  },
}).mount("#app");
