class Earl {

    constructor(obj) {
        this.structure = obj;
    }

    selectVortex(name) {
        return this.structure[name];
    }

    selectEdge(vortex1, vortex2) {
        return this.structure[vortex1][vortex2];
    }

    selectAdjacent(vortex) {
        let arr = []
        for (var key in this.structure[vortex]) {
            arr.push(key);
        }
        return arr.toString();
    }

    addVortex(obj) {
        const new_key = Object.keys(obj)
        for (var key in this.structure) {
            if (new_key == key) {
                console.log('Vortexes can not have same names');
                return -1;
            }
        }
        this.structure[new_key] = obj[new_key]

        for (var key in obj[new_key]) {
            let edge = obj[new_key][key];
            for (var key_o in this.structure) {
                if (key == key_o) this.structure[key_o][new_key] = edge;
            }
        }


        return this.structure;
    }
    addEdge(vortex1, vortex2, value) {
        for (var key in this.structure) {
            if (key == vortex1) this.structure[key][vortex2] = value;
        }
        for (var key in this.structure) {
            if (key == vortex2) this.structure[key][vortex1] = value;
        }
        return this.structure;
    }

    deleteVortex(name) {
        delete this.structure[name];
        for (var key in this.structure) {
            for (var key_o in this.structure[key]) {
                if (key_o == name)
                    delete this.structure[key][key_o];
            }
        }

        return this.structure;

    }

   /* findWay(vortex1, vortex2) {
        const key_array = Object.keys(this.structure);
        let line_array = [];
        let array = [];

        for (var key in this.structure) {
            key_array.forEach(function (item) {
                if (item == key) {
                    console.log(key);
                    console.log(this.structure);
                    line_array.push(this.structure[key]);
                } else {
                    line_array.push(2000000000);
                }
            });
            array.push(line_array);
        }

        return array;
    }*/

}

const str = {
    a: {
        b: 5,
        c: 7,
        d: 1,
        e: 9
    },
    b: {
        a: 5
    },
    c: {
        a: 7,
        d: 11
    },
    d: {
        a: 1,
        c: 11,
        e: 2
    },
    e: {
        a: 9,
        f: 4
    },
    f: {
        e: 4
    }
}

let newEarl = new Earl(str);
let Adjacent = newEarl.addVortex({
    g: {
        b: 5,
        c: 7,
        d: 1,
        e: 9
    }
});
Adjacent = newEarl.addEdge('d', 'f', 0);
//Adjacent = newEarl.findWay('a', 'b');
console.log(Adjacent);
