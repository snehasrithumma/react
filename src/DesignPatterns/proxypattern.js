class Pool {
    constructor(pool) {
        this.pool = pool;

    }
    pool() {
        console.log(`Pool in th hose:+ ${this.pool}`)
    }
}


class House {
    constructor(address, pool) {
        this.address = address;
        this.pool = pool;
    }
    hasPool() {
        if (!this.pool) {
            this.pool = new Pool(this.address)
        }
        return this.pool
    }
}

let myHouse = new House('San Diego', false)
let otherHouse = new House('San Diego', null)