// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
    this.id = store.customers.indexOf(this) + 1
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.customerId === this.id )
  }

  meals() {
    return this.deliveries().map( delivery => delivery.meal() )
  }

  totalSpent() {
    return this.meals().map(meal => meal.price).reduce((total,price) => total + price, 0 )
  }
}

class Neighborhood {
  constructor(name) {
    this.name = name
    store.neighborhoods.push(this)
    this.id = store.neighborhoods.indexOf(this) + 1
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.neighborhoodId === this.id )
  }

  customers() {
    return store.customers.filter( customer => customer.neighborhoodId === this.id)
  }

  meals() {
    return this.deliveries().map( delivery => delivery.meal() )
                            .filter((name, index, meal) => meal.indexOf(name) === index)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    store.meals.push(this)
    this.id = store.meals.indexOf(this) + 1
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.mealId === this.id )
  }

  customers() {
    return this.deliveries().map( delivery => delivery.customer() )
  }

  static byPrice() {
    return store.meals.sort((a,b) => b.price - a.price)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
    this.id = store.deliveries.indexOf(this) + 1
  }

  meal() {
    return store.meals.find( meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find( customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find( neighborhood => neighborhood.id === this.neighborhoodId)
  }
}